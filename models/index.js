const User = require('./User');
const Product = require('./Product');
const Transaction = require('./Transaction');
const Watchlist = require('./Watchlist');

// Relationships
User.hasMany(Transaction);
Transaction.belongsTo(User);

Product.hasMany(Transaction);
Transaction.belongsTo(Product);

User.belongsToMany(Product, { through: Watchlist });
Product.belongsToMany(User, { through: Watchlist });

module.exports = {
  User,
  Product,
  Transaction,
  Watchlist
};
