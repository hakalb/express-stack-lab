var express = require('express');
var router = express.Router();

/**
 * GET: home page
 */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express Stack' });
});

module.exports = router;