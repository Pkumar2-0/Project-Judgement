const { Telemetry } = require('../models');

exports.receiveTelemetry = async (req, res) => {
  try {
    const { droneId, gps, altitude, speed, battery } = req.body;

    console.log('Received payload:', { droneId, gps, altitude, speed, battery });

    // Save to database
    const saved = await Telemetry.create({
      droneId,
      gps,
      altitude,
      speed,
      battery
    });

    if (!saved) {
      throw new Error('Save failed');
    }

    // Manually format the saved data to return to Postman
    const savedData = {
      id: saved.id,
      droneId: saved.droneId,
      gps: saved.gps,
      altitude: saved.altitude,
      speed: saved.speed,
      battery: saved.battery,
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt
    };

    console.log('Sending to Postman:', savedData);

    res.status(201).json({
      message: 'Telemetry saved successfully',
      data: savedData
    });

  } catch (err) {
    console.error('❌ Error saving telemetry:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to save telemetry data' });
  }
};
