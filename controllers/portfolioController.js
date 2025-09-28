const { Transaction, Product } = require('../models');

exports.getPortfolio = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.userId },
      include: [Product]
    });

    const portfolio = transactions.map(tx => {
      const currentValue = tx.units * tx.Product.price;
      const returns = currentValue - tx.totalCost;
      return {
        product: tx.Product.name,
        units: tx.units,
        invested: tx.totalCost,
        currentValue,
        returns
      };
    });

    res.status(200).json({ portfolio });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
};
