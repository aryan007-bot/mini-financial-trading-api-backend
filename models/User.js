const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  pan: { type: DataTypes.STRING, allowNull: false },
  kycImage: { type: DataTypes.STRING },
  wallet: { type: DataTypes.FLOAT, defaultValue: 100000 }
}, {
  timestamps: true
});

module.exports = User;
