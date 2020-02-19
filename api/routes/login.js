import express from 'express';

const router = express.Router();

export default app => {
  app.use('/login', router);

  /**
   * GET: Login and Signup
   */
  router.get('/', function(req, res) {
    res.render('login', { title: 'LogIn' });
  });
};
