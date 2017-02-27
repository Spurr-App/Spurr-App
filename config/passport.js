var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy = require('passport-twitter').Strategy;
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var connection = require('../dbConnection.js');
var configAuth = require('./auth');

module.exports = function(passport) {
// turn the user info into serialized
  passport.serializeUser(function(user, done) {
    console.log(user, 'user')
    done(null, user.user_id);
  });
// deserialize the user
  passport.deserializeUser(function(id, done) {
    //by finding by the id
    connection.query(`select * from users where user_id = ${id}`, (err, rows) => {
      done(err, rows);
    });
  });
// use the local sign up method
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      connection.query("select * from users where email = '"+email+"'",function(err,rows){
      console.log(rows);
      console.log("above row object");
        if (err) {
          return done(err);
        }
        if (rows.length) {
          return done(null, false);
        } else {
          const newUserMysql = new Object();
          newUserMysql.email    = email;
          newUserMysql.password = password; // use the generateHash function in our user model
          // newUser.local.password = newUser.generateHash(password);
          const insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
          console.log(insertQuery);
          connection.query(insertQuery, (error, rowsTwo) => {
            console.log(rowsTwo, 'rowsTwo')
            console.log(newUserMysql, 'newUserMysql')
            newUserMysql.user_id = rowsTwo.insertId;

            return done(null, newUserMysql);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  function(req, email, password, done) {
    connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", (err, rows) => {
      if (err) {
        return done(err);
      }
      if (!rows.length) {
        return done(null, false); // req.flash is the way to set flashdata using connect-flash
      }

  // if the user is found but the password is wrong
      if (!(rows[0].password === password)) {
        return done(null, false); // create the loginMessage and save it to session as flashdata
      }

  // all is well, return successful user
      return done(null, rows[0]);
    });
  }));
  //
  // passport.use(new FacebookStrategy({
  //   //sending over from the auth.js file
  //   clientID: configAuth.facebookAuth.clientID,
  //   clientSecret: configAuth.facebookAuth.clientSecret,
  //   callbackURL: configAuth.facebookAuth.callbackURL,
  //   // profile fields
  //   profileFields: ['id', 'email', 'first_name', 'last_name'],
  // },
  // function(token, refreshToken, profile, done) {
  //   //defer the function until a completely new stack so fill in as many tasks in this stack
  //   process.nextTick(function() {
  //     //do a query string
  //     User.findOne({ 'facebook.id': profile.id }, function(err, user) {
  //       if (err)
  //         return done(err);
  //       if (user) {
  //         return done(null, user);
  //       } else {
  //         var newUser = new User();
  //         newUser.facebook.id = profile.id;
  //         newUser.facebook.token = token;
  //         newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
  //         newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
  //
  //         newUser.save(function(err) {
  //           if (err)
  //             throw err;
  //           return done(null, newUser);
  //         });
  //       }
  //     });
  //   });
  // }));

  // passport.use(new TwitterStrategy({
  //   consumerKey: configAuth.twitterAuth.consumerKey,
  //   consumerSecret: configAuth.twitterAuth.consumerSecret,
  //   callbackURL: configAuth.twitterAuth.callbackURL,
  // },
  // function(token, tokenSecret, profile, done) {
  //   process.nextTick(function() {
  //     User.findOne({ 'twitter.id': profile.id }, function(err, user) {
  //       if (err)
  //         return done(err);
  //       if (user) {
  //         return done(null, user);
  //       } else {
  //         var newUser = new User();
  //         newUser.twitter.id          = profile.id;
  //         newUser.twitter.token       = token;
  //         newUser.twitter.username    = profile.username;
  //         newUser.twitter.displayName = profile.displayName;
  //         newUser.save(function(err) {
  //           if (err)
  //            throw err;
  //           return done(null, newUser);
  //         });
  //       }
  //     });
  //   });
  // }));
  //
  // passport.use(new GoogleStrategy({
  //   clientID: configAuth.googleAuth.clientID,
  //   clientSecret: configAuth.googleAuth.clientSecret,
  //   callbackURL: configAuth.googleAuth.callbackURL,
  // },
  //   function(token, refreshToken, profile, done) {
  //     process.nextTick(function() {
  //       User.findOne({ 'google.id': profile.id }, function(err, user) {
  //         if (err)
  //           return done(err);
  //         if (user) {
  //           return done(null, user);
  //         } else {
  //           var newUser = new User();
  //           newUser.google.id = profile.id;
  //           newUser.google.token = token;
  //           newUser.google.name = profile.displayName;
  //           newUser.google.email = profile.emails[0].value;
  //           newUser.save(function(err) {
  //             if (err)
  //               throw err;
  //             return done(null, newUser);
  //           });
  //         }
  //       });
  //     });
  //   }));

};
