// Import the Alert model from the models folder
const Alert = require('../models/Alert');

// Controller to create a new alert
// This route receives alert data (from drone/AI) and saves it to the database
exports.createAlert = async (req, res) => {
  try {
    // Destructure values from the request body
    const { message, level, timestamp, droneId } = req.body;

    // Create a new alert entry in the database
    const alert = await Alert.create({ message, level, timestamp, droneId });

    // Respond with the created alert and status 201 (Created)
    res.status(201).json(alert);
  } catch (err) {
    // Handle any errors (e.g. DB issues)
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

// Controller to fetch all alerts
// Useful for displaying a list of alerts in the dashboard (e.g. obstacle detection, battery warnings)
exports.getAlerts = async (req, res) => {
  try {
    // Fetch all alert entries from the database
    const alerts = await Alert.findAll();

    // Send the list of alerts in the response
    res.status(200).json(alerts);
  } catch (err) {
    // Handle errors gracefully
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};
