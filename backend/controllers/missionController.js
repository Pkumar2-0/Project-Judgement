// Import the Mission model (Sequelize ORM)
const Mission = require('../models/Mission');

// Import the configured Redis client for caching
const redisClient = require('../utils/redisClient');

// Create a new mission (POST /api/missions)
exports.createMission = async (req, res) => {
  try {
    // Extract fields from request body
    const { name, objective, status, assignedDrone,waypoints } = req.body;

    // Store new mission in the database
    const mission = await Mission.create({ name, objective, status, assignedDrone,waypoints });

    // Clear the Redis cache for missions since data is now outdated
    await redisClient.del('missions');

    // Respond with the created mission
    res.status(201).json(mission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create mission' });
  }
};

// Fetch all missions (GET /api/missions) — with Redis caching
exports.getMissions = async (req, res) => {
  try {
    // Try getting cached data from Redis
    const cachedMissions = await redisClient.get('missions');

    if (cachedMissions) {
      console.log('Missions served from Redis cache');
      return res.status(200).json(JSON.parse(cachedMissions));
    }

    // Cache miss → fetch from DB
    const missions = await Mission.findAll();

    // Cache the fresh result in Redis (expires in 60 seconds)
    await redisClient.set('missions', JSON.stringify(missions), { EX: 60 });

    console.log('Missions fetched from DB and cached');
    res.status(200).json(missions);
  } catch (err) {
    console.error('REDIS ERROR:', err);
    res.status(500).json({ error: 'Failed to fetch missions' });
  }
};

// Update a mission (PUT /api/missions/:id)
exports.updateMission = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, objective, status, assignedDrone,waypoints } = req.body;

    // Update mission details in DB
    const updated = await Mission.update(
      { name, objective, status, assignedDrone,waypoints },
      { where: { id } }
    );

    // If no rows updated, mission not found
    if (updated[0] === 0) {
      return res.status(404).json({ error: "Mission not found" });
    }

    // Invalidate cache since data has changed
    await redisClient.del('missions');

    res.json({ message: "Mission updated successfully" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: "Failed to update mission" });
  }
};
