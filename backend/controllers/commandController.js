// Import the Command model from models/index.js
// Destructured in case there are multiple exports
const { Command } = require("../models");

// Controller to handle POST /api/commands
// This allows the frontend to send drone control commands (abort, reroute, return)
exports.sendCommand = async (req, res) => {
  try {
    // Extract droneId and command type from request body
    const { droneId, command } = req.body;

    // Validate command type
    if (!["abort", "reroute", "return"].includes(command)) {
      return res.status(400).json({ error: "Invalid command type" });
    }

    // Create and store the command in the database
    // Status is set to "pending" by default (can later be updated by drone/AI)
    const newCommand = await Command.create({
      droneId,
      command,
      status: "pending",
    });

    // Respond with the created command object
    res.status(201).json(newCommand);
  } catch (err) {
    // Handle errors like DB failure or bad input
    res.status(500).json({ error: "Failed to send command" });
  }
};
