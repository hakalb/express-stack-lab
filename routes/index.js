const express = require('express');
const router = express.Router();

// Pages rendered from server
router.use('/', require('./pages'));

// Api endpoints
router.use('/api', require('./api'));

module.exports = router;
