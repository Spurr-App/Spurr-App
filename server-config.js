 /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const reqTo = require('./server/router.js');
const passport = require('passport');
const rp = require('request-promise');
require('./config/passport')(passport);
require('./dbConnection');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// this is listened to by the post form in index.html
app.post('/api/users/signup', passport.authenticate('local-signup'), (req, res) => {
  res.json(req.body.username);
});
app.post('/api/users/signin', passport.authenticate('local-login'), (req, res) => {
  res.json(req.body.username);
});



app.get('/api/imagequery',
(req, res, next) => {
  const parameters = {
    method: 'POST',
    url: 'https://connect.gettyimages.com/oauth2/token',
    body: `grant_type=client_credentials&client_id=${process.env.GETTY_KEY}&client_secret=${process.env.GETTY_SECRET}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  rp(parameters)
    .then((token) => {
      const parseToken = JSON.parse(token).access_token;
      process.env.GETTY_TOKEN = parseToken;
      next();
    })
    .catch(err => console.err('ERROR:', err));
}
, (req, res) => {
  const parameters = {
    url: `https://api.gettyimages.com/v3/search/images?phrase=${req.query.data}`,
    headers: {
      'Api-Key': process.env.GETTY_KEY,
      Authorization: `Bearer ${process.env.GETTY_TOKEN}`,
    },
    method: 'GET',
  };
  rp(parameters)
    .then((images) => {
      const parsedImages = JSON.parse(images).images;
      const uris = parsedImages.reduce((accum, image) => {
        accum.push({
          id: image.id,
          url: image.display_sizes[0].uri,
        });
        return accum;
      }, []);
      res.send(uris);
    })
    .catch(err => console.err('ERROR:', err));
});


app.get('/#!/signout', (req, res) => {
  req.logout();
  res.redirect('/signin');
});

app.post('/api/spurrs', reqTo.postSpurr);

app.get('/api/spurrs', reqTo.getSpurr);

app.post('/api/savedSpurrs', reqTo.saveSpurr);

app.get('/api/savedSpurrs', reqTo.getSavedSpurrs);

module.exports = app;
