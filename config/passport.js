const LocalStrategy = require('passport-local').Strategy;
const connection = require('../dbConnection.js');
const Bluebird = require('bluebird');
const bcrypt = Bluebird.promisifyAll(require('bcryptjs'));

const connBlue = Bluebird.promisifyAll(connection);

module.exports = (passport) => {
// turn the user info into serialize
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
// deserialize the user
  passport.deserializeUser((id, done) => {
    // by finding by the id
    connBlue.queryAsync(`SELECT * FROM users WHERE id = ${id}`)
      .then((rows) => {
        done(null, rows);
      })
      .catch((err) => {
        done(err, null);
      });
  });
// use the local sign up method
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,

  }, (req, username, password, done) => {
    process.nextTick(() => {
      connBlue.queryAsync(`SELECT * FROM users WHERE username = '${username}'`)
        .then((rows) => {
          if (rows.length) {
            return done(null, false);
          }
          const newUserMysql = {};
          newUserMysql.username = username;
          return bcrypt.hashAsync(password, 10)
            .then((hash) => {
              newUserMysql.password = hash;
              const insertQuery = `INSERT INTO users ( username, password ) VALUES ('${username}','${hash}')`;
              return connBlue.queryAsync(insertQuery)
                .then((rowsTwo) => {
                  newUserMysql.id = rowsTwo.insertId;
                  return done(null, newUserMysql);
                })
                .catch((err) => {
                  throw new Error(err);
                });
            });
        })
        .catch(err => done(null, err));
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, username, password, done) => {
    connBlue.queryAsync(`SELECT * FROM users WHERE username = '${username}'`)
      .then((rows) => {
        if (!rows.length) {
          return done(null, false); // req.flash is the way to set flashdata using connect-flash
        }

    // if the user is found but the password is wrong
        if (!(rows[0].password === password)) {
           // create the loginMessage and save it to session as flashdata
        }
        return bcrypt.compare(password, rows[0].password)
          .then((result) => {
            if (result) {
              return done(null, rows[0]);
            }
            return done(null, false);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch(err => done(err));
  }));
};
