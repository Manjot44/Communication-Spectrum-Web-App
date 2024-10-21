import jwt from 'jsonwebtoken';
import AsyncLock from 'async-lock';
import bcrypt from 'bcrypt';
import { InputError, AccessError, } from './error';
import { pool } from './server'

const lock = new AsyncLock();

const JWT_SECRET = 'llamallamaduck';

/***************************************************************
                       Helper Functions
***************************************************************/

export const userLock = callback => new Promise((resolve, reject) => {
  lock.acquire('userAuthLock', done => {
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
}

/***************************************************************
                       Auth Functions
***************************************************************/

export const getEmailFromAuthorization = async (authorization) => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { email } = jwt.verify(token, JWT_SECRET);
    const { rows } = await pool.query('SELECT * FROM "Professionals" WHERE email = $1', [email]);
    if (rows.length !== 1) {
      throw new AccessError('Invalid token');
    }
    return email;
  } catch {
    throw new AccessError('Invalid token');
  }
};

export const login = async (email, password) => {
  return userLock(async (resolve, reject) => {
    try {
      const { rows } = await pool.query('SELECT * FROM "Professionals" WHERE email = $1', [email]);
      if (rows.length > 0) {
        const admin = rows[0];
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (isPasswordValid) {
          const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
          resolve(token);
        } else {
          reject(new InputError('Invalid username or password'));
        }
      } else {
        reject(new InputError('Invalid username or password'));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const register = async (email, password, name) => {
  return userLock(async (resolve, reject) => {
    try {
      const { rowCount } = await pool.query('SELECT * FROM "Professionals" WHERE email = $1', [email]);
      if (rowCount > 0) {
        return reject(new InputError('Email address already registered'));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const queryText = `
        INSERT INTO "Professionals" (email, full_name, password)
        VALUES ($1, $2, $3);
      `;
      const values = [email, name, hashedPassword];
      await pool.query(queryText, values);
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export const complete_reg = async (email, profession, country, postcode, date, isSubscribed) => {
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

export const create_user = async (name, dob, postcode, communication, interests, environments, profilePicture) => {
  return userLock(async (resolve, reject) => {
    try {
      const queryText = `
        INSERT INTO "SupportUsers" (name, dob, postcode, snapshot, comm_env, interests, profile_pic)
        VALUES ($1, $2, $3, $4, $6, $5, $7) RETURNING user_id;
      `;
      const values = [name, dob, postcode, communication, interests, environments, profilePicture];
      const result = await pool.query(queryText, values);
      const user_id = result.rows[0].user_id;
      resolve(user_id);
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
        const client = await pool.query('SELECT * FROM "SupportUsers" WHERE user_id = $1', [profileID]);
        resolve(client.rows[0]);
      } else {
        reject(new AccessError('You do not have access to this client'))
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
        const images = await pool.query('SELECT * FROM "Images" WHERE user_id = $1', [profileID]);
        resolve(images.rows);
      } else {
        reject(new AccessError('You do not have access to this client'))
      }
    } catch (error) {
      reject(error)
    }
  });
};

export const add_image = async (email, profileID, image) => {
  return userLock(async (resolve, reject) => {
    try {
      const rows = await checkClientAuth(email, profileID);
      if (rows.length > 0) {
        const queryText = `
          INSERT INTO "Images" (url, user_id)
          VALUES ($1, $2);
        `;
        const values = [image, profileID];
        await pool.query(queryText, values);
        resolve();
      } else {
        reject(new AccessError('You do not have access to this client'))
      }
    } catch (error) {
      reject(error)
    }
  });
};
