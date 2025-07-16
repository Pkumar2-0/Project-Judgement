// Import Sequelize data types
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // DB connection instance

// Define the Mission model (table: Missions)
const Mission = sequelize.define('Mission', {
  // Name/title of the mission (e.g., "Surveillance Run A")
  name: DataTypes.STRING,

  // Objective or description of the mission (can be multi-line)
  objective: DataTypes.TEXT,

  // Current status: could be "pending", "active", or "complete"
  status: DataTypes.STRING,

  // ID of the assigned drone (e.g., "DR-001")
  assignedDrone: DataTypes.STRING,

  waypoints: {
    type: DataTypes.JSON,
    allowNull: true   // temporarily allow null
  }


});

// Export the Mission model to use in controllers, routes, etc.
module.exports = Mission;
