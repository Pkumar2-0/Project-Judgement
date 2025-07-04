/**
 * @swagger
 * /api/alerts:
 *   post:
 *     summary: Create alert log
 *     tags: [Alert]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               level:
 *                 type: string
 *               timestamp:
 *                 type: string
 *               droneId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Alert created
 */

/**
 * @swagger
 * /api/alerts:
 *   get:
 *     summary: Get all alerts
 *     tags: [Alert]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of alerts
 */

// Required dependencies and controller functions
const express = require('express');
const router = express.Router();
const { createAlert, getAlerts } = require('../controllers/alertController');
const verifyToken = require('../middleware/verifyToken'); // Protect all routes with JWT

// PUT /api/alerts/:id
// Update a specific alert by ID (e.g., modify status, message)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    // Update alert with new data from req.body
    const updated = await Alert.update(req.body, { where: { id } });

    if (!updated[0])
      return res.status(404).json({ error: 'Alert not found' });

    res.json({ message: 'Alert updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update alert' });
  }
});

// POST /api/alerts
// Create a new alert entry (from drone or AI)
router.post('/', verifyToken, createAlert);

// GET /api/alerts
// Fetch all alerts for the dashboard UI
router.get('/', verifyToken, getAlerts);

// Export all routes
module.exports = router;
