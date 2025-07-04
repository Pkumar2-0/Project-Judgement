const { Drone } = require('../models');

// Create a new drone
exports.createDrone = async (req, res) => {
  try {
    const { droneId, status, gps, battery } = req.body;
    const drone = await Drone.create({ droneId, status, gps, battery });
    res.status(201).json(drone);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create drone' });
  }
};

// Get all drones
exports.getDrones = async (req, res) => {
  try {
    const drones = await Drone.findAll();
    res.status(200).json(drones);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drones' });
  }
};
