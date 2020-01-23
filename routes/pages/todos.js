var express = require('express');
var router = express.Router();

/**
 * GET: Todos
 */
router.get('/', function(req, res) {
  res.render('todos', { title: 'Todos' });
});

module.exports = router;
