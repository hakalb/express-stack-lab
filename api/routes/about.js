import express from 'express';

const router = express.Router();

export default app => {
  app.use('/about', router);

  /**
   * GET: About
   */
  router.get('/', function(req, res) {
    res.render('about', { title: 'About' });
  });
};
