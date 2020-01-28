const passport = require('passport');

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
module.exports = authorize;
