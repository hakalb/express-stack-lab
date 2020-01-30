import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import keys from '../../config/keys';
import { UserModel } from '../../models/user';
import { authorize } from '../../middleware/authorize';

const router = express.Router();

/**
 * POST: Register user attempt
 */
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  // Authentication will take approximately 13 seconds
  // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
  const hashCost = 10;

  try {
    // Does username already exists?
    if (await UserModel.findOne({ username: username }).exec()) {
      return res.status(403).send({
        message: 'Username already taken'
      });
    }

    // Create password hash and save the user
    const passwordHash = await bcrypt.hash(password, hashCost);
    const userDocument = new UserModel({ username, email, passwordHash });
    await userDocument.save();

    return res.status(200).send({ username });
    // TODO Next, auto login?
  } catch (error) {
    console.error('Save new user failed', error);
    return res.status(400).send({
      message:
        'req body should take the form { username, password, email (optional) }'
    });
  }
});

/**
 * POST: Login user attempt
 */
router.post('/login', (req, res) => {
  // Authenticate credentials using local strategy and return the user
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
      expires: Date.now() + parseInt(keys.JWT_EXPIRE_IN_SECONDS) * 1000
    };

    // This will assign payload to req.user
    req.login(payload, { session: false }, error => {
      if (error) {
        return res.status(500).send({ error });
      }

      // Generate a signed json web token and return it in the response
      const token = jwt.sign(JSON.stringify(payload), keys.JWT_SECRET);

      // Assign our jwt token to the cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: keys.COOKIE_HTTPS_SECURE // TODO support for HTTPS
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

export default router;
