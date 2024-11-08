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
    if (!authorization) {
      console.log("No Authorization header provided.");
      throw new AccessError("Authorization header is required.");
    }

    let token = authorization;

    // Check if the token starts with "Bearer " and remove it if necessary
    if (authorization.startsWith("Bearer ")) {
      token = authorization.replace("Bearer ", "");
    }
    // } else {
    //   console.log(
    //     "Warning: Authorization token does not start with 'Bearer '. Token:",
    //     authorization
    //   );
    // }

    // Decode the token and extract the email
    const { email } = jwt.verify(token, JWT_SECRET);
    // console.log("Extracted email from token:", email);

    // Validate email against the Professionals table
    const { rows } = await pool.query(
      'SELECT * FROM "Professionals" WHERE email = $1',
      [email]
    );

    if (rows.length !== 1) {
      console.log("Invalid token: Email not found in database:", email);
      throw new AccessError("Invalid token");
    }

    return email;
  } catch (error) {
    console.log("Token decoding or validation failed:", error.message);
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

export const update_user_profile = async (
  profileID,
  name,
  snapshot,
  interests,
  commEnv
) => {
  return userLock(async (resolve, reject) => {
    try {
      const queryText = `
        UPDATE "SupportUsers"
        SET name = $2,
            snapshot = $3,
            interests = $4,
            comm_env = $5
        WHERE user_id = $1;
      `;
      const values = [profileID, name, snapshot, interests, commEnv];
      const result = await pool.query(queryText, values);

      if (result.rowCount === 0) {
        throw new InputError("Profile update failed: user not found.");
      }
      resolve();
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

/***************************************************************
                      Supports Functions
***************************************************************/

export const new_support = async (
  email,
  profileID,
  text,
  image,
  value,
  stepImages,
  stepNames,
  stepTimes,
  category,
  isHorizontal
) => {
  return userLock(async (resolve, reject) => {
    try {
      const rows = await checkClientAuth(email, profileID);
      if (rows.length > 0) {
        const supportQuery = `
          INSERT INTO "Supports" (title, title_img, date, step_img, step_names, step_times, category, layout, prof_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING support_id;
        `;
        const supportResult = await pool.query(supportQuery, [
          text,
          image,
          value,
          stepImages,
          stepNames,
          stepTimes,
          category,
          isHorizontal,
          email,
        ]);
        const support_id = supportResult.rows[0].support_id;

        const insertAccessQuery = `
          INSERT INTO "hasSupport" (support_id, user_id)
          VALUES ($1, $2);
        `;
        await pool.query(insertAccessQuery, [support_id, profileID]);

        resolve();
      } else {
        reject(new AccessError("You do not have access to this client"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const get_client_support = async (email, profileID) => {
  return userLock(async (resolve, reject) => {
    try {
      const rows = await checkClientAuth(email, profileID);
      if (rows.length > 0) {
        const queryText = `
          SELECT S.*, u.name
          FROM "Supports" S
            JOIN "hasSupport" h on h.support_id = S.support_id
            JOIN "SupportUsers" u on u.user_id = h.user_id
          WHERE h.user_id = $1;
        `;
        const client = await pool.query(queryText, [profileID]);
        resolve(client.rows);
      } else {
        reject(new AccessError("You do not have access to this client"));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const delete_support = async (email, supportID) => {
  return userLock(async (resolve, reject) => {
    try {
      console.log(
        `Checking authorization for user ${email} to delete support ${supportID}`
      );

      const authQuery = `
        SELECT h.user_id
        FROM "hasSupport" h
        JOIN "SupportUsers" s ON h.user_id = s.user_id
        JOIN "Professionals" p ON p.email = $1
        WHERE h.support_id = $2;
      `;
      const authResult = await pool.query(authQuery, [email, supportID]);

      if (authResult.rows.length === 0) {
        console.log(
          `Authorization failed: User ${email} does not have permission to delete support ${supportID}`
        );
        return reject(
          new AccessError("You do not have permission to delete this support")
        );
      }

      console.log(
        `Authorization passed for user ${email} to delete support ${supportID}`
      );

      // Delete from hasSupport table
      await pool.query('DELETE FROM "hasSupport" WHERE support_id = $1', [
        supportID,
      ]);
      console.log(`Deleted from hasSupport table for support ${supportID}`);

      // Delete from Supports table
      await pool.query('DELETE FROM "Supports" WHERE support_id = $1', [
        supportID,
      ]);
      console.log(`Deleted from Supports table for support ${supportID}`);

      resolve();
    } catch (error) {
      console.log(
        `Error in delete_support for support ${supportID}:`,
        error.message
      );
      reject(error);
    }
  });
};
