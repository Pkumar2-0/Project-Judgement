/**
 * @swagger
 * /api/telemetry:
 *   post:
 *     summary: Submit telemetry data
 *     tags: [Telemetry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               droneId:
 *                 type: string
 *               gps:
 *                 type: string
 *               altitude:
 *                 type: number
 *               speed:
 *                 type: number
 *               battery:
 *                 type: number
 *     responses:
 *       201:
 *         description: Telemetry saved
 */

const express = require('express');
const router = express.Router();

const { receiveTelemetry } = require('../controllers/telemetryController');
const verifyToken = require('../middlewares/verifyToken');
const { Telemetry } = require('../models'); // Import model to fetch data
const { body, validationResult } = require('express-validator'); // ✅ Added for validation

// ✅ Validation middleware to prevent SQL injection & bad input
const telemetryValidation = [
  body('droneId')
    .isString().withMessage('droneId must be a string')
    .matches(/^[\w-]+$/).withMessage('droneId contains invalid characters'),

  body('gps')
    .isString().withMessage('GPS must be a string')
    .matches(/^[-0-9.,\s]+$/).withMessage('GPS must contain valid coordinates only'),

  body('altitude')
    .isFloat().withMessage('Altitude must be a float'),

  body('speed')
    .isFloat().withMessage('Speed must be a float'),

  body('battery')
    .isFloat().withMessage('Battery must be a float')
];

// POST /api/telemetry
// Save telemetry data sent from drone
router.post('/', verifyToken, telemetryValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Call controller only if validation passed
  return receiveTelemetry(req, res);
});

// GET /api/telemetry/drone-ids - Get all unique drone IDs
router.get('/drone-ids', verifyToken, async (req, res) => {
  try {
    const droneIds = await Telemetry.findAll({
      attributes: [
        [require('sequelize').fn('DISTINCT', require('sequelize').col('droneId')), 'droneId']
      ],
      raw: true
    });
    res.json(droneIds.map(d => d.droneId));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drone IDs' });
  }
});

// GET /api/telemetry/:droneId - Get latest telemetry by drone ID
router.get('/:droneId', verifyToken, async (req, res) => {
  try {
    const { droneId } = req.params;

    const data = await Telemetry.findOne({
      where: { droneId },
      order: [['createdAt', 'DESC']] // get latest
    });

    if (!data) {
      return res.status(404).json({ error: 'No telemetry found for this drone' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch telemetry' });
  }
});

// Export router to use in server.js
module.exports = router;
