const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
require('dotenv').config();
const reqTo = require('./server/router.js');

const app = express();
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

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
    console.log('Connection with mysql established');
});

app.post('/api/spurrs', reqTo.postSpurr);

app.get('/api/spurrs', reqTo.getSpurr);

app.post('/api/savedSpurrs', reqTo.saveSpurr);

app.get('/api/savedSpurrs', reqTo.getSavedSpurrs);

module.exports = app;
