var express = require('express');
var router = express.Router();

/**
 * GET: Todos
 */
router.get('/', function(req, res, next) {
  res.render('todos', { title: 'Todos' });
});

module.exports = router;
