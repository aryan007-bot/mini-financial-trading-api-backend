const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Watchlist = sequelize.define('Watchlist', {}, {
  timestamps: true
});

module.exports = Watchlist;
