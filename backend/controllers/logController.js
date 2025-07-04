const { Log } = require('../models');

exports.createLog = async (req, res) => {
  try {
    const { droneId, event } = req.body;
    const log = await Log.create({ droneId, event });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create log' });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.findAll({ order: [['timestamp', 'DESC']] });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
};
