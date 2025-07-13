const express = require('express');
const router = express.Router();

const { receiveTelemetry, getLatestTelemetry } = require('../controllers/telemetryController');
const verifyToken = require('../middleware/verifyToken');
const roleCheck = require('../middleware/roleCheck'); // Import roleCheck
const { Telemetry } = require('../models'); // Import model to fetch data

/**
 * @swagger
 * /api/v1/telemetry:
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

/**
 * @swagger
 * /api/v1/telemetry/{droneId}:
 *   get:
 *     summary: Get latest telemetry data for a drone
 *     tags: [Telemetry]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: droneId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the drone
 *     responses:
 *       200:
 *         description: Telemetry data found
 *       404:
 *         description: No telemetry found for this drone
 */


// POST: any authenticated user (admin/operator) can send telemetry
router.post('/', verifyToken, receiveTelemetry);

// Get latest telemetry for a drone
router.get('/latest/:droneId', getLatestTelemetry); 


// GET: only admin can view telemetry of drones
router.get('/:droneId', verifyToken, roleCheck('admin'), async (req, res) => {
  try {
    const { droneId } = req.params;

    const data = await Telemetry.findOne({
      where: { droneId },
      order: [['createdAt', 'DESC']]
    });

    if (!data) {
      return res.status(404).json({ error: 'No telemetry found for this drone' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch telemetry' });
  }
});

module.exports = router;
