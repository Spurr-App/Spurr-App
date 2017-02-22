const mysql = require('mysql');
require('dotenv').config();

const HOST = process.env.HOST;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DB;

const db = mysql.createConnection({
  host: HOST,
  user: 'root',
  // user: USER,
  password: PASSWORD,
  database: DATABASE,
});

const router = {};

// @input requests (array) : array of

// @result

router.get = function get(reqs, table, db) {
  const req = reqs.join(',');
  const query = `SELECT ${req} FROM ${table}`;
  return db.query(query, (err, rows) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
};


router.post = function post(attrs, columns, table, db) {
  const attr = attrs.join('", "');
  const cols = columns.join(',');
  const query = `INSERT INTO ${table} (${cols}) VALUES ("${attr}")`;
  return db.query(query, (err, rows) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
};

router.spurrAPI = function ({ body }) {
  console.log(body);
  let attrs = [body.date, body.location, body.message];
  let columns = ['timestamp', 'location', 'message'];
  router.post(attrs, columns, 'spurrs', db);
};

module.exports = router;
