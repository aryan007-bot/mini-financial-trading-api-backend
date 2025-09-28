const { User, Product, Transaction } = require('../models');

exports.buyProduct = async (req, res) => {
  try {
    const { productId, units } = req.body;
    if (!productId || !units) return res.status(400).json({ error: 'Product ID and units required' });

    const user = await User.findByPk(req.userId);
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const cost = product.price * units;
    if (user.wallet < cost) return res.status(400).json({ error: 'Insufficient funds' });

    user.wallet -= cost;
    await user.save();

    const transaction = await Transaction.create({
      userId: user.id,
      productId: product.id,
      units,
      totalCost: cost
    });

    res.status(200).json({ message: 'Transaction successful', transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Transaction failed' });
  }
};
