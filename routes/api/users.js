const mongoose = require('mongoose');
const passport = require('passport');
const auth = require('../auth');
const Users = mongoose.model('Users');

var express = require('express');
var router = express.Router();

/**
 * Check required user data
 * @param {*} res HttpResponse
 * @param {*} user Current user
 */
function checkRequiredData(res, user) {
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  return null;
}

/**
 * POST: sign up user route (optional, everyone has access)
 */
router.post('/signup', auth.optional, (req, res) => {
  const user = req.body.user;

  const error = checkRequiredData(res, user);
  if (error) {
    return error;
  }

  // Check if user already exists, then return the user
  Users.findOne({ email: user.email }).then(foundUser => {
    if (foundUser) {
      return res.status(302).json({
        message: 'User email already signed up',
        user: foundUser.toAuthJSON()
      });
    } else {
      // Create a new user
      const newUser = new Users(user);
      newUser.setPassword(user.password);

      return newUser
        .save()
        .then(() => res.json({ user: newUser.toAuthJSON() }));
    }
  });
});

/**
 * POST: login route (optional, everyone has access)
 */
router.post('/login', auth.optional, (req, res, next) => {
  const user = req.body.user;

  const err = checkRequiredData(res, user);
  if (err) {
    return err;
  }

  // Find user in database by email and password
  return passport.authenticate(
    'local',
    {
      session: false,
      successFlash: 'Login successfull',
      failureMessage: 'Login failed'
    },
    // eslint-disable-next-line no-unused-vars
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        // req.logIn(user, err => {
        //   if (err) next(err);
        //   return res.json({ user: user.toAuthJSON() });
        // });
        return res.json({
          user: user.toAuthJSON()
        });
      }
      // User not found
      return res.sendStatus(401).info;
    }
  )(req, res, next);
});

/**
 * PUT: logout route (required, only authenticated users have access)
 */
router.put('/logout', auth.required, (req, res) => {
  if (!req.isAuthenticated()) return res.status(200).send('Not logged in');

  if (req.isAuthenticated()) req.logOut();
  return res.sendStatus(200);
});

/**
 * GET: current route (required, only authenticated users have access)
 */
router.get('/current', auth.required, (req, res) => {
  // id from token authentication
  const id = req.payload.id;

  // Lookup user in database
  return Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }
    // Return user public data to client
    return res.json({
      user: user.toAuthJSON(),
      paylod: req.payload
    });
  });
});

module.exports = router;
