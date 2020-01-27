const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');

const { JWT_SECRET } = require('./keys');
const UserModel = require('../models/user');

const JWTStrategy = passportJWT.Strategy;

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  console.log('Get token', token);
  return token;
};

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

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: JWT_SECRET
    },
    async (jwtPayload, done) => {
      try {
        // Check that the user still exists
        if (
          !(await UserModel.findOne({
            username: jwtPayload.username
          }).exec())
        ) {
          console.log(`User not found by username '${jwtPayload.username}'`);
          return done(null, false);
        }

        // Check expire
        if (Date.now() > jwtPayload.expires) {
          console.log(
            `jwt for username '${jwtPayload.username}' expired ${new Date(
              jwtPayload.expires
            ).toLocaleString()}`
          );
          return done(null, false);
        }

        // OK, return user
        return done(null, jwtPayload);
      } catch (error) {
        console.error('JWTStrategy', error);
        return done(error, null);
      }
    }
  )
);
