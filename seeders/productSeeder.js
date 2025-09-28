const { Product } = require('../models');

const seedProducts = async () => {
  try {
    await Product.bulkCreate([
      { name: 'Nifty 50 ETF', price: 185.75, peRatio: 22.4 },
      { name: 'Gold Fund', price: 512.30, peRatio: 15.2 },
      { name: 'Tech Growth Fund', price: 320.10, peRatio: 35.8 },
      { name: 'Green Energy ETF', price: 275.40, peRatio: 18.9 },
      { name: 'Global Index Fund', price: 450.00, peRatio: 20.1 }
    ]);
    console.log('Products seeded');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
};

seedProducts();
