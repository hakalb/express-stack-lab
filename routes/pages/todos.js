import express from 'express';

const router = express.Router();

/**
 * GET: Todos
 */
router.get('/', function(req, res) {
  res.render('todos', { title: 'Todos' });
});

export default router;
