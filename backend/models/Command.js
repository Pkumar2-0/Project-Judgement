// Import Sequelize tools
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // DB connection

// Define the Command model (table: Commands)
const Command = sequelize.define("Command", {
  // The ID of the drone receiving this command
  droneId: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },

  // Type of command to send — must be one of the 3 defined options
  command: {
    type: DataTypes.ENUM("abort", "reroute", "return"),
    allowNull: false, // Must be valid
  },

  // Current status of the command (e.g., pending, executed)
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending", // Default when command is created
  },
});

// Export the model so it can be used in controller and routes
module.exports = Command;
