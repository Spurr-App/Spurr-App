/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
// const router      = express.Router();
const mysql          = require('mysql');
const path           = require('path');
require('dotenv').config();
const reqTo          = require('./server/router.js');

const app            = express();
const HOST           = process.env.HOST;
const USER           = process.env.USER;
const PASSWORD       = process.env.PASSWORD;
const DATABASE       = process.env.DB;
const dbConnection   = mysql.createConnection({
  host: HOST,
  user: 'root',
  // user: USER,
  password: PASSWORD,
  database: DATABASE,
});

// Authentication ==========================================================
// app.use(cookieParser('shhhh, very secret'));
// app.use(session({
//   secret: 'shhh, it\'s a secret',
//   resave: false,
//   saveUninitialized: true
// }));

// middlewares ===================================================================

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// parse application/vnd.api+json as json
// app.use(methodOverride('X-HTTP-Method-Override'));
// override with the X-HTTP-Method-Override header in the request

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

// reqTo.get(['*'], 'spurrs', dbConnection);

module.exports = app;

// routes ======================================================================
// require('./app/routes.js')(app);
