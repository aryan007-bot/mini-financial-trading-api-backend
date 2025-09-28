const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  units: { type: DataTypes.INTEGER, allowNull: false },
  totalCost: { type: DataTypes.FLOAT, allowNull: false }
}, {
  timestamps: true
});

module.exports = Transaction;
