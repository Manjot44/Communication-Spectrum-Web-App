import jwt from "jsonwebtoken";
import AsyncLock from "async-lock";
import bcrypt from "bcrypt";
import { InputError, AccessError } from "./error";
import { pool } from "./server";

const lock = new AsyncLock();

const JWT_SECRET = "llamallamaduck";

/***************************************************************
                       Helper Functions
***************************************************************/

export const userLock = (callback) =>
  new Promise((resolve, reject) => {
    lock.acquire("userAuthLock", (done) => {
      callback(resolve, reject).then(done).catch(done);
    });
  });

export const checkClientAuth = async (email, profileID) => {
  const queryText = `
      SELECT p.email, s.user_id
      FROM "hasClient" h
        JOIN "Professionals" p on p.email = h.prof_id
        JOIN "SupportUsers" s on s.user_id = h.user_id
      WHERE p.email = $1 AND s.user_id = $2;
      `;
  const { rows } = await pool.query(queryText, [email, profileID]);
  return rows;
};

/***************************************************************
                       Auth Functions
***************************************************************/

export const getEmailFromAuthorization = async (authorization) => {
  try {
    const token = authorization.replace("Bearer ", "");
    const { email } = jwt.verify(token, JWT_SECRET);
    const { rows } = await pool.query(
      'SELECT * FROM "Professionals" WHERE email = $1',
      [email]
    );
    if (rows.length !== 1) {
      throw new AccessError("Invalid token");
    }
    return email;
  } catch {
    throw new AccessError("Invalid token");
  }
};

export const login = async (email, password) => {
  return userLock(async (resolve, reject) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM "Professionals" WHERE email = $1',
        [email]
      );
      if (rows.length > 0) {
        const admin = rows[0];
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (isPasswordValid) {
          const token = jwt.sign({ email }, JWT_SECRET, { algorithm: "HS256" });
          resolve(token);
        } else {
          reject(new InputError("Invalid username or password"));
        }
      } else {
        reject(new InputError("Invalid username or password"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const register = async (email, password, name) => {
  return userLock(async (resolve, reject) => {
    try {
      const { rowCount } = await pool.query(
        'SELECT * FROM "Professionals" WHERE email = $1',
        [email]
      );
      if (rowCount > 0) {
        return reject(new InputError("Email address already registered"));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const queryText = `
        INSERT INTO "Professionals" (email, full_name, password)
        VALUES ($1, $2, $3);
      `;
      const values = [email, name, hashedPassword];
      await pool.query(queryText, values);
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: "HS256" });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export const complete_reg = async (
  email,
  profession,
  country,
  postcode,
  date,
  isSubscribed
) => {
  return userLock(async (resolve, reject) => {
    try {
      const queryText = `
        UPDATE "Professionals"
        SET location = $3,
            dob = $5,
            profession = $2,
            postcode = $4,
            is_subbed = $6
        WHERE email = $1;
      `;
      const values = [email, profession, country, postcode, date, isSubscribed];
      await pool.query(queryText, values);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

/***************************************************************
                    Support User Functions
***************************************************************/

export const create_user = async (
  name,
  dob,
  postcode,
  communication,
  interests,
  environments,
  profilePicture
) => {
  return userLock(async (resolve, reject) => {
    try {
      const queryText = `
        INSERT INTO "SupportUsers" (name, dob, postcode, snapshot, comm_env, interests, profile_pic)
        VALUES ($1, $2, $3, $4, $6, $5, $7) RETURNING user_id;
      `;
      const values = [
        name,
        dob,
        postcode,
        communication,
        interests,
        environments,
        profilePicture,
      ];
      const result = await pool.query(queryText, values);
      const user_id = result.rows[0].user_id;
      resolve(user_id);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateProfilePicture = async (profileID, profilePicture) => {
  const client = await pool.connect();
  try {
    // Modify user profile picture in db
    const result = await client.query(
      `UPDATE "SupportUsers"
       SET profile_pic = $1
       WHERE user_id = $2
      `,
      [profilePicture, profileID]
    );

    if (result.rowCount === 0) {
      throw new InputError(
        "Profile picture update failed: user not found or unauthorized."
      );
    }
  } finally {
    client.release();
  }
};

// NOTE: deletion for privacy also need to take care of the other contents like image, etc
export const delete_user = async (email, user_id) => {
  return userLock(async (resolve, reject) => {
    try {
      const rows = await checkClientAuth(email, user_id);
      if (rows.length === 0) {
        return reject(new AccessError("You do not have access to this client"));
      }

      await pool.query('DELETE FROM "hasClient" WHERE user_id = $1', [user_id]);

      const imageRows = await pool.query(
        'SELECT img_id FROM "ProfUserImageAccess" WHERE user_id = $1',
        [user_id]
      );
      const imageIds = imageRows.rows.map((row) => row.img_id);

      if (imageIds.length > 0) {
        await pool.query(
          'DELETE FROM "ProfUserImageAccess" WHERE img_id = ANY($1::int[])',
          [imageIds]
        );
        await pool.query('DELETE FROM "Images" WHERE img_id = ANY($1::int[])', [
          imageIds,
        ]);
      }

      await pool.query('DELETE FROM "SupportUsers" WHERE user_id = $1', [
        user_id,
      ]);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const create_client = async (email, user_id) => {
  return userLock(async (resolve, reject) => {
    try {
      const queryText = `
        INSERT INTO "hasClient" (prof_id, user_id)
        VALUES ($1, $2);
      `;
      const values = [email, user_id];
      await pool.query(queryText, values);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const get_clients = async (email) => {
  return userLock(async (resolve, reject) => {
    try {
      const queryText = `
        SELECT p.email, s.name, s.profile_pic, s.user_id
        FROM "hasClient" h
          JOIN "Professionals" p on p.email = h.prof_id
          JOIN "SupportUsers" s on s.user_id = h.user_id
        WHERE p.email = $1;
      `;
      const values = [email];
      const clients = await pool.query(queryText, values);
      resolve(clients.rows);
    } catch (error) {
      reject(error);
    }
  });
};

export const get_client = async (email, profileID) => {
  return userLock(async (resolve, reject) => {
    try {
      const rows = await checkClientAuth(email, profileID);
      if (rows.length > 0) {
        const client = await pool.query(
          'SELECT * FROM "SupportUsers" WHERE user_id = $1',
          [profileID]
        );
        resolve(client.rows[0]);
      } else {
        reject(new AccessError("You do not have access to this client"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

/***************************************************************
                      Images Functions
***************************************************************/

export const get_images = async (email, profileID) => {
  return userLock(async (resolve, reject) => {
    try {
      const rows = await checkClientAuth(email, profileID);
      if (rows.length > 0) {
        const images = await pool.query(
          `
          SELECT I.* 
          FROM "Images" I
          JOIN "ProfUserImageAccess" PUIA 
            ON I.img_id = PUIA.img_id
          WHERE PUIA.user_id = $1 
            AND PUIA.prof_id = $2
          `,
          [profileID, email]
        );
        resolve(images.rows);
      } else {
        reject(new AccessError("You do not have access to this client"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const add_image = async (email, profileID, image) => {
  return userLock(async (resolve, reject) => {
    try {
      const rows = await checkClientAuth(email, profileID);
      if (rows.length > 0) {
        // Insert the image into the Images table first
        const insertImageQuery = `
          INSERT INTO "Images" (url)
          VALUES ($1)
          RETURNING img_id;
        `;
        const imageResult = await pool.query(insertImageQuery, [image]);
        const img_id = imageResult.rows[0].img_id;

        // Insert the relationship between the professional, user, and image into ProfUserImageAccess
        const insertAccessQuery = `
          INSERT INTO "ProfUserImageAccess" (img_id, prof_id, user_id)
          VALUES ($1, $2, $3);
        `;
        const accessValues = [img_id, email, profileID];
        await pool.query(insertAccessQuery, accessValues);

        resolve();
      } else {
        reject(new AccessError("You do not have access to this client"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const delete_image = async (email, img_id) => {
  return userLock(async (resolve, reject) => {
    try {
      await pool.query('DELETE FROM "ProfUserImageAccess" WHERE img_id = $1', [
        img_id,
      ]);
      await pool.query('DELETE FROM "Images" WHERE img_id = $1', [img_id]);

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
