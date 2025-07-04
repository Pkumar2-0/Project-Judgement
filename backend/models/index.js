// Import Sequelize constructor and data types
const { Sequelize, DataTypes } = require('sequelize');

// Import configured Sequelize instance (connected to your PostgreSQL DB)
const sequelize = require('../config/db');

// Create a db object to store all models + connection
const db = {};

db.Sequelize = Sequelize;   // Sequelize library reference (optional)
db.sequelize = sequelize;   // Actual DB connection instance

// Load and register all Sequelize models
db.User = require('./User');         // User model (auth, roles)
db.Mission = require('./Mission');   // Mission model (planning)
db.Telemetry = require('./Telemetry'); // Live telemetry from drone
db.Alert = require('./Alert');       // AI/ML alert logs
db.Command = require('./Command');   // Command model (abort/reroute/etc.)
// models/index.js
db.Log = require('./Log');
db.Drone = require('./Drone');


// Export everything so it can be used across the app
module.exports = db;
