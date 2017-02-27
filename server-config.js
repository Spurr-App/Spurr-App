const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const reqTo = require('./server/router.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
require('./config/passport')(passport);
require('./dbConnection');


const app = express();


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// this is listened to by the post form in index.html
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/#!/confess',
  failureRedirect: '/#!/signin',
}));
app.post('/signin', passport.authenticate('local-login', {
  successRedirect: '/#!/confess',
  failureRedirect: '/#!/signin',
}));


app.post('/api/spurrs', reqTo.postSpurr);

app.get('/api/spurrs', reqTo.getSpurr);

app.post('/api/savedSpurrs', reqTo.saveSpurr);

app.get('/api/savedSpurrs', reqTo.getSavedSpurrs);

module.exports = app;
