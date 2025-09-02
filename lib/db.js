// lib/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'secret123',
  database: process.env.DB_NAME || 'appdb',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
