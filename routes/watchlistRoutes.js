const express = require('express');
const router = express.Router();
const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist
} = require('../controllers/watchlistController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, addToWatchlist);
router.delete('/:productId', authenticate, removeFromWatchlist);
router.get('/', authenticate, getWatchlist);

module.exports = router;
