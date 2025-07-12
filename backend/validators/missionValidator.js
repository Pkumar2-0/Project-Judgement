// validators/missionValidator.js
const { body } = require('express-validator');

exports.missionValidationRules = [
  body('name').notEmpty().withMessage('Mission name is required'),
  body('objective').notEmpty().withMessage('Objective is required'),
  body('status').isIn(['pending', 'active', 'completed']).withMessage('Invalid status'),
  body('assignedDrone').notEmpty().withMessage('Drone ID is required'),
  body('waypoints').isArray({ min: 1 }).withMessage('Waypoints must be a non-empty array')
];
