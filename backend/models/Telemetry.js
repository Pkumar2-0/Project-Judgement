// Import Sequelize components
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // DB connection instance

// Define the Telemetry model (table: Telemetries)
const Telemetry = sequelize.define('Telemetry', {
  // ID of the drone sending the telemetry data
  droneId: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Current GPS location (latitude,longitude as string)
  gps: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Drone's altitude in meters
  altitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  // Drone's speed in km/h (or any other unit used)
  speed: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  // Battery level in percentage (should match validator type)
  battery: {
    type: DataTypes.FLOAT,
    allowNull: false
  }

}, {
  tableName: 'Telemetries',  // Optional: customize table name
  timestamps: true           // Adds createdAt and updatedAt fields
});

// Export the model for use in routes/controllers
module.exports = Telemetry;
