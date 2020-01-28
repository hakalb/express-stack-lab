const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

const { JWT_SECRET } = require('./keys');
const UserModel = require('../models/user');

const JWTStrategy = passportJWT.Strategy;

/**
 * Local strategy, used when validating login requests.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },

    async (username, password, done) => {
      try {
        // Get the user
        const userDocument = await UserModel.findOne({
          username: username
        }).exec();

        if (!userDocument) {
          console.log(`User not found by username '${username}'`);
          return done(null, null);
        }

        // Check password
        const passwordsMatch = await bcrypt.compare(
          password,
          userDocument.passwordHash
        );

        if (passwordsMatch) {
          return done(null, userDocument);
        } else {
          console.log(`Password hash did not match for username '${username}'`);
          return done(null, null);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

/**
 * JWT cookie strategy, used when granting access to protected endpoints.

 * Note! 
 * Use encapsulated version instead, which is found in middleware/authorize.js.
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: req => req.cookies && req.cookies['jwt'],
      secretOrKey: JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        // Check expire
        if (Date.now() > jwtPayload.expires) {
          return done(
            null,
            false,
            `jwt for username '${jwtPayload.username}' expired ${new Date(
              jwtPayload.expires
            ).toLocaleString()}`
          );
        }

        // OK, return user
        return done(null, jwtPayload, null);
      } catch (error) {
        return done(error, null, null);
      }
    }
  )
);
