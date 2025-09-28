const express = require('express');
const router = express.Router();
const { buyProduct } = require('../controllers/transactionController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, buyProduct);

module.exports = router;
