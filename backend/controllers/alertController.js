const Alert = require('../models/Alert');

// POST /api/v1/alerts
exports.createAlert = async (req, res) => {
  try {
    const { message, level, timestamp, droneId } = req.body;

    const alert = await Alert.create({ message, level, timestamp, droneId });

    // Emit alert via WebSocket
    const io = req.app.get('io');
    io.emit('alert-raised', alert); // Broadcast to all clients

    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.findAll();
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};
