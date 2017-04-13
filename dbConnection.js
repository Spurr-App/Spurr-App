require('dotenv').config();
const mysql = require('mysql');

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const DATABASE = process.env.DB_NAME;
const PORT = process.env.DB_PORT;
const PASSWORD = process.env.DB_PASSWORD;

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  port: PORT,
  database: DATABASE,
  password: PASSWORD,
});

db.connect((err) => {
  if (err) {
    console.warn(err);
    return;
  }
  console.warn('Connection with mysql established');
});

module.exports = db;
