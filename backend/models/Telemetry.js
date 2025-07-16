// Import Sequelize components
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // DB connection instance

// Define the Telemetry model (table: Telemetries)
const Telemetry = sequelize.define('Telemetry', {
  // ID of the drone sending the telemetry data
  droneId: DataTypes.STRING,

  // Current GPS location (latitude,longitude as string)
  gps: {
    type: DataTypes.JSON,  // true JSON type
    allowNull: false
  },

  // Drone's altitude in meters
  altitude: DataTypes.FLOAT,

  // Drone's speed in km/h (or any other unit used)
  speed: DataTypes.FLOAT,

  // Battery level in percentage (e.g., 78)
  battery: DataTypes.INTEGER,
});

// Export the model for use in telemetryController and elsewhere
module.exports = Telemetry;
