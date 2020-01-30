import express from 'express';

const router = express.Router();

/**
 * GET: home page
 */
router.get('/', async (req, res) => {
  res.render('home', { title: 'Express Stack' });
});

export default router;
