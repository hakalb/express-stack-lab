import express from 'express';

const router = express.Router();

export default app => {
  app.use('/todos', router);

  /**
   * GET: Todos
   */
  router.get('/', function(req, res) {
    res.render('todos', { title: 'Todos' });
  });
};
