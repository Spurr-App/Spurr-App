const mysql = require('mysql');

const HOST = process.env.HOST;
// const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DB;
const dbConnection = mysql.createConnection({
  host: HOST,
  user: 'root',
  // user: USER,
  password: PASSWORD,
  database: DATABASE,
});

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
    console.log('Connection with mysql established');
});

module.exports = dbConnection;
