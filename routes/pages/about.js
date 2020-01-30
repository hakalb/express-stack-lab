import express from 'express';

const router = express.Router();

/**
 * GET: About
 */
router.get('/', function(req, res) {
  res.render('about', { title: 'About' });
});

export default router;
