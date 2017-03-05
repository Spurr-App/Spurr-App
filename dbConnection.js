const mysql = require('mysql');

const HOST = process.env.HOST;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DB;
const dbConnection = mysql.createConnection({
  host: HOST,
  user: 'root',
  password: PASSWORD,
  database: DATABASE,
});

dbConnection.connect((err) => {
  if (err) {
    console.warn(err);
    return;
  }
    console.warn('Connection with mysql established');
});

module.exports = dbConnection;
