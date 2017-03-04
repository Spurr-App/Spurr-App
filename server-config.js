const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const reqTo = require('./server/router.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const rp = require('request-promise')
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
app.post('/api/users/signup', passport.authenticate('local-signup'), (req, res) => {
  res.json(req.body.username);
});
app.post('/api/users/signin', passport.authenticate('local-login'), (req, res) => {
  res.json(req.body.username);
});

app.get('/api/imagequery', (req, res) => {
  console.log(req.query.data);
  let parameters = {
    url:`https://api.gettyimages.com/v3/search/images?phrase=${req.query.data}`,
    headers: {
      'Api-Key': process.env.GETTY_KEY
    },
    method: "GET",
  }
  rp(parameters)
    .then((images) => {
      images = JSON.parse(images).images;
      var uris = images.reduce((accum,image) => {
          accum.push({
          id:image.id,
          url:image.display_sizes[0].uri
        })
        return accum;
      },[]);
      res.send(uris)
    })
    .catch(err => console.log('ERROR:', err));
});


app.get('/#!/signout', function(req, res) {
  req.logout();
  res.redirect('/signin');
});

app.post('/api/spurrs', reqTo.postSpurr);

app.get('/api/spurrs', reqTo.getSpurr);

app.post('/api/savedSpurrs', reqTo.saveSpurr);

app.get('/api/savedSpurrs', reqTo.getSavedSpurrs);

module.exports = app;
