import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { authorize } from '../middlewares/passport';
import { config } from '../../config';
import { UserService } from '../../services';

const router = express.Router();

export default app => {
  app.use('/auth', router);

  /**
   * POST: Register user attempt
   */
  router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    const service = new UserService();

    if (await service.find(username)) {
      return res.status(403).send({
        message: 'Username already taken'
      });
    }

    const user = await service.register(username, password, email);

    if (!user) {
      return res.status(400).send({
        message:
          'req body should take the form { username, password, email (optional) }'
      });
    }

    return res.status(200).send({ username });
    // TODO Next, auto login?
  });

  /**
   * POST: Login user attempt
   */
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user) => {
      if (error) {
        return res.status(400).json({ message: error });
      }
      if (!user) {
        return res
          .status(401)
          .json({ message: 'User credentials did not match' });
      }

      // Create jwt payload content which ends up in the cookie
      const payload = {
        username: user.username,
        expires:
          Date.now() + parseInt(config.security.JWT_EXPIRE_IN_SECONDS) * 1000
      };

      // This will assign payload to req.user
      req.login(payload, { session: false }, error => {
        if (error) {
          return res.status(500).send({ error });
        }

        // Generate a signed json web token and return it in the response
        const token = jwt.sign(
          JSON.stringify(payload),
          config.security.JWT_SECRET
        );

        // Assign our jwt token to the cookie
        res.cookie('jwt', token, {
          httpOnly: true,
          secure: config.security.COOKIE_HTTPS_SECURE // TODO support for HTTPS
        });
        const username = payload.username;
        return res.status(200).send({ username });
      });
    })(req, res);
  });

  /**
   * PUT: Logout user
   */
  router.put('/logout', (req, res) => {
    req.logout();
    res.clearCookie('jwt');
    return res.sendStatus(200);
  });

  /**
   * GET: Test protected endpoint
   */
  router.get('/protected', authorize, (req, res) => {
    const { user } = req;

    return res.status(200).send(
      Object.assign({}, user, {
        // TODO replcae with spread operator when allowed
        expiresAsLocal: new Date(user.expires).toLocaleString()
      })
    );
  });
};
