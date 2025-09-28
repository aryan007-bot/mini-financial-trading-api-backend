const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { signup, login } = require('../controllers/authController');

router.post('/signup', upload.single('kycImage'), signup);
router.post('/login', login);

module.exports = router;
