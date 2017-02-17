var express                 = require('express');
var app                     = express();
var morgan                  = require('morgan');
var bodyParser              = require('body-parser');
var methodOverride          = require('method-override');
const router                = express.Router();
var mysql                   = require('mysql');

//Authentication ==========================================================
// app.use(cookieParser('shhhh, very secret'));
// app.use(session({
//   secret: 'shhh, it\'s a secret',
//   resave: false,
//   saveUninitialized: true
// }));


var dbConnection = mysql.createConnection({
  host: '',
  user: 'root',
  password: '',
  database: '',
});
dbConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connection with mysql established');
});


// dbConnection.query('INSERT INTO users (username) VALUE ("liv")', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.' + err);
// });
// dbConnection.query('SELECT * from users', function(err, rows, fields) {
//   if (!err)
//     console.log('The solution is: ', rows);
//   else
//     console.log('Error while performing Query.' + err);
// });
// dbConnection.end(err =>
//   console.log('connection ended gracefully')
// );
app.get('/', (req, res) => {
  res.send('hello');
});



// connection.connect();
//
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
//
// connection.end();
//testing mongoose

//Connecting to our models ======
// require('./models/prayerRequestModel.js'); // which executes 'mongoose.connect()'



// middlewares ===================================================================
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

module.exports = app;

// routes ======================================================================
// require('./app/routes.js')(app);
