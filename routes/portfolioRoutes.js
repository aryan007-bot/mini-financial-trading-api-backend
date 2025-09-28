const express = require('express');
const router = express.Router();
const { getPortfolio } = require('../controllers/portfolioController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, getPortfolio);

module.exports = router;
