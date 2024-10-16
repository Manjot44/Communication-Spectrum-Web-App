// backend/config.js
require('dotenv').config();

module.exports = {
    user: 'myuser',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'MyCommsPro',
    password: process.env.DB_PASSWORD || 'mypassword',
    port: process.env.DB_PORT || 5432,
};
