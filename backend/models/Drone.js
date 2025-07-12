const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Drone model/table definition
const Drone = sequelize.define('Drone', {
  droneId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING, // e.g. active, idle, offline
    allowNull: false,
  },
  gps: {
    type: DataTypes.JSON, // STRING if you're stringifying
    allowNull: true
  },
  battery: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Drone;

