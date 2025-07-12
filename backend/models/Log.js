// models/Log.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Log = sequelize.define('Log', {
  droneId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'info', // info, warning, error
  },
  createdBy: {
    type: DataTypes.STRING, // can store email or role
    allowNull: true
  },
  source: {
    type: DataTypes.STRING, // which part generated it (e.g. 'missionController')
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Log;
