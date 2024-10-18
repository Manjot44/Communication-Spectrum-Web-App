import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AsyncLock from 'async-lock';
import { InputError, AccessError, } from './error';
import { Pool } from 'pg';
import config from './config';

const lock = new AsyncLock();

const JWT_SECRET = 'llamallamaduck';
const DATABASE_FILE = './database.json';

/***************************************************************
                       State Management
***************************************************************/

// let admins = {};

// const sessionTimeouts = {};

// const update = (admins) =>
//   new Promise((resolve, reject) => {
//     lock.acquire('saveData', () => {
//       try {
//         fs.writeFileSync(DATABASE_FILE, JSON.stringify({
//           admins,
//         }, null, 2));
//         resolve();
//       } catch {
//         reject(new Error('Writing to database failed'));
//       }
//     });
//   });

// export const save = () => update(admins);
// export const reset = () => {
//   update({});
//   admins = {};
// };

// try {
//   const data = JSON.parse(fs.readFileSync(DATABASE_FILE));
//   admins = data.admins;
// } catch {
//   console.log('WARNING: No database found, create a new one');
//   save();
// }

/***************************************************************
                       Helper Functions
***************************************************************/

export const userLock = callback => new Promise((resolve, reject) => {
  lock.acquire('userAuthLock', done => {
    callback(resolve, reject).then(done).catch(done);
  });
});

/***************************************************************
                       Auth Functions
***************************************************************/

export const getEmailFromAuthorization = async(authorization) => {
  try {
    const token = authorization.replace('Bearer ', '');
    const { email } = jwt.verify(token, JWT_SECRET);
    return email;
  } catch {
    throw new AccessError('Invalid token');
  }
};

export const login = async (email, password) => {
  return userLock(async (resolve, reject) => {
    try {
      const pool = new Pool(config);
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
      await pool.end();
    } catch (error) {
      reject(error);
    }
  });
};

export const register = async (email, password, name) => {
  return userLock(async (resolve, reject) => {
    try {
      const pool = new Pool(config);
      const { rowCount } = await pool.query('SELECT * FROM "Professionals" WHERE email = $1', [email]);
      if (rowCount > 0) {
        return reject(new InputError('Email address already registered'));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const queryText = `
        INSERT INTO "Professionals" (email, full_name, password)
        VALUES ($1, $2, $3) RETURNING prof_id;
      `;
      const values = [email, name, hashedPassword];
      await pool.query(queryText, values);
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
      await pool.end();
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

export const complete_reg = async (email, profession, country, postcode, date, isSubscribed) => {
  return userLock(async (resolve, reject) => {
    try {
      const pool = new Pool(config);
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
      await pool.end();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

/***************************************************************
                       Store Functions
***************************************************************/

// export const getStore = (email) => userLock((resolve, reject) => {
//   resolve(admins[email].store);
// });

// export const setStore = (email, store) => userLock((resolve, reject) => {
//   admins[email].store = store;
//   resolve();
// });