const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllProducts);
router.get('/:id', authenticate, getProductById);

module.exports = router;
