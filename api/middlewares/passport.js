import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';

import { config } from '../../config';
import { UserService } from '../../services';

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

/**
 * Local strategy, used when validating login requests.
 */
const localPassportStrategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },

  async (username, password, done) => {
    try {
      const service = new UserService();

      // Authenticate the user
      const { authenticated, user } = await service.authenticate(
        username,
        password
      );
      // Check if user was authenticated
      if (!authenticated) {
        return done(null, null);
      }
      // Ok
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

/**
 * JWT cookie strategy, used when granting access to protected endpoints.

 * Note! 
 * Use encapsulated version instead, which is found in middleware/authorize.js.
 */
const jwtPassportStrategy = new JWTStrategy(
  {
    jwtFromRequest: req => req.cookies && req.cookies['jwt'],
    secretOrKey: config.security.JWT_SECRET
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
);

/**
 * Encapsulate passport.authenticate for easier use in api endpoints.
 *
 * Since the function is encapsulated, authorize() is responsible of
 * returning rest responses or throw errors.
 *
 * @example
 * router.get('/endpoint', authorize, (req, res) => {
 *   const { user } = req;
 *   ...
 *   return res.status(<code>).send(<object>);
 * });
 */
const authorize = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // Response 500 when error found
    if (err) {
      console.error('[authorize]', err);
      return res.sendStatus(500);
    }
    // Response 401 (unauthorized) when token was invalid
    if (user === false) {
      console.error(
        '[authorize]',
        info.name || 'Invalid token',
        info.message || info || ''
      );
      return res.sendStatus(401);
    }

    console.log('[authorize]', 'User granted from valid token', user);
    req.user = user;
    return next();
  })(req, res, next);
};

// Export
export { authorize, jwtPassportStrategy, localPassportStrategy };
