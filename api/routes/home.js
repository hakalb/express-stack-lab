import express from 'express';

const router = express.Router();

export default app => {
  app.use('/', router);

  /**
   * GET: home page
   */
  router.get('/', async (req, res) => {
    res.render('home', { title: 'Express Stack' });
  });
};
