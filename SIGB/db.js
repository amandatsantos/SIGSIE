const mysql = require('mysql2/promise');
require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = mysql.createPool({
  host: DB_HOST || 'localhost',
  user: DB_USER || 'root',
  password: DB_PASSWORD || 'root',
  database: DB_DATABASE || 'dbsig',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
