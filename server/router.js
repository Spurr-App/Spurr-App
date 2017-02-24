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

router.post = function post(db, params, columns, table) {
  const attr = params.join("', '");
  const cols = columns.join(',');
  const query = `INSERT INTO ${table} (${cols}) VALUES ('${attr}')`;
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
  const columns = Object.keys(body);
  const params = columns.reduce((arr, key) => arr.concat([body[key]]), []);
  router.post(db, params, columns, 'spurrs');
  res.sendStatus(200);
};

router.saveSpurr = function ({ body }, res) {
  const columns = Object.keys(body);
  const params = columns.reduce((arr, key) => arr.concat([body[key]]), []);
  router.post(db, params, columns, 'saved_spurrs');
  res.sendStatus(200);
};

// @input requests (array) : array of

// @result

router.get = function get(db, reqs, table) {
  const req = reqs.join(',');
  const query = `SELECT ${req} FROM ${table} ORDER BY spurr_id ASC LIMIT 1`;
  return new Promise(function(resolve, reject) {
    db.query(query, (err, rows) => {
      if (!err) {
        console.log(rows[0]);
        resolve(rows[0]);
        const del = `DELETE FROM ${table} WHERE spurr_id = ${rows[0].spurr_id}`;
        db.query(del);
      } else {
        console.log(err);
      }
    });
  });
};

router.getSpurr = function (req, res) {
  router.get(db, ['*'], 'spurrs')
  .then(function (data) {
    res.status(200).send(data);
  });
};

router.getSavedSpurrs = function (req, res) {
  router.get(db, ['*'], 'spurrs')
  .then(function (data) {
    res.status(200).send(data);
  });
};

module.exports = router;
