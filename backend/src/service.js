import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AsyncLock from 'async-lock';
import { InputError, AccessError, } from './error';
import { pool } from './server';

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
    // if (!(email in admins)) {
    //   throw new AccessError('Invalid Token');
    // }
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

// export const login = (email, password) => userLock((resolve, reject) => {
//   if (email in admins) {
//     if (admins[email].password === password) {
//       resolve(jwt.sign({ email, }, JWT_SECRET, { algorithm: 'HS256', }));
//     }
//   }
//   reject(new InputError('Invalid username or password'));
// });
export const logout = (email) => userLock((resolve, reject) => {
  //admins[email].sessionActive = false;
  resolve();
});

export const register = async (email, password, full_name, location, dob, profession, postcode, isSubbed) => {
  return userLock(async (resolve, reject) => {
    try {
      const { rowCount } = await pool.query('SELECT * FROM "Professionals" WHERE email = $1', [email]);
      if (rowCount > 0) {
        return reject(new InputError('Email address already registered'));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const queryText = `
        INSERT INTO "Professionals" (email, full_name, password, location, dob, profession, postcode, is_subbed)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING prof_id;
      `;
      const values = [email, full_name, hashedPassword, location, dob, profession, postcode, isSubbed];
      await pool.query(queryText, values);
      const token = jwt.sign({ email }, JWT_SECRET, { algorithm: 'HS256' });
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

// export const register = (email, password, name) => userLock((resolve, reject) => {
//   if (email in admins) {
//     return reject(new InputError('Email address already registered'));
//   }
//   admins[email] = {
//     name,
//     password,
//     store: {},
//   };
//   const token = jwt.sign({ email, }, JWT_SECRET, { algorithm: 'HS256', });
//   resolve(token);
// });

/***************************************************************
                       Cleanup Functions
***************************************************************/

// Function to dump data to SQL file
export const dumpDataToSQLFile = async () => {
  try {
    const tables = ['Professionals', 'SupportUsers', 'Supports', 'Images', 'hasClient', 'hasSupport'];
    
    let sqlDump = '';
    for (const table of tables) {
      const { rows } = await pool.query(`SELECT * FROM "${table}"`);
      for (const row of rows) {
        const keys = Object.keys(row).map(key => `"${key}"`).join(', ');
        const values = Object.values(row).map(value => `'${value}'`).join(', ');
        sqlDump += `INSERT INTO "${table}" (${keys}) VALUES (${values});\n`;
      }
    }

    fs.writeFileSync('../../init/zdump.sql', sqlDump);
    console.log('Database dump created successfully.');
  } catch (error) {
    console.error('Error creating database dump:', error);
  }
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