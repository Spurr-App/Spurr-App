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

router.post = function post(attrs, columns, table, db) {
  const attr = attrs.join('", "');
  const cols = columns.join(',');
  const query = `INSERT INTO ${table} (${cols}) VALUES ("${attr}")`;
  console.log(query);
  return db.query(query, (err, rows) => {
    if (!err) {
      console.log(rows)
    } else {
      console.log(err);
    }
  });
};

router.postSpurr = function ({ body }, res) {
  let attrs = [body.location, body.message];
  let columns = ['location', 'message'];
  router.post(attrs, columns, 'spurrs', db);
  res.send(200);
};

// @input requests (array) : array of

// @result

router.get = function get(reqs, table, db) {
  const req = reqs.join(',');
  const query = `SELECT ${req} FROM ${table}`;
  return new Promise(function(resolve, reject) {
    db.query(query, (err, rows) => {
      if (!err) {
        resolve(rows[0])
        console.log(rows);
      } else {
        console.log(err);
      }
    });
  });
};

router.getSpurr = function (req, res) {
  router.get(['*'], 'spurrs', db)
  .then(function (data) {
    res.status(200).send(data);
  });
};

module.exports = router;
