var express = require('express');
var router = express.Router();

/**
 * GET: Login
 */
router.get('/login', function(req, res) {
  res.render('partials/wip', { title: 'Login' });
});

/**
 * GET: Logout
 */
router.get('/logout', function(req, res) {
  res.render('partials/wip', { title: 'Logout' });
});

module.exports = router;
