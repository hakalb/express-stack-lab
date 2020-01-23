const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/about', require('./about'));
router.use('/todos', require('./todos'));

module.exports = router;
