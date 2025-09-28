const { User, Product } = require('../models');

exports.addToWatchlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findByPk(req.userId);
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await user.addProduct(product);
    res.status(200).json({ message: 'Product added to watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const user = await User.findByPk(req.userId);
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await user.removeProduct(product);
    res.status(200).json({ message: 'Product removed from watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: {
        model: Product,
        through: { attributes: [] }
      }
    });

    res.status(200).json({ watchlist: user.Products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
};
