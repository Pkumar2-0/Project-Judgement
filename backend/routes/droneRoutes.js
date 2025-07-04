/**
 * @swagger
 * /api/drones:
 *   post:
 *     summary: Add a new drone
 *     tags: [Drone]
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
 *               status:
 *                 type: string
 *               gps:
 *                 type: string
 *               battery:
 *                 type: number
 *     responses:
 *       201:
 *         description: Drone added successfully
 *
 *   get:
 *     summary: Get list of all drones
 *     tags: [Drone]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of drones
 */


const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { createDrone, getDrones } = require('../controllers/droneController');

// Swagger docs (optional)
router.post('/', verifyToken, createDrone);  // Add drone
router.get('/', verifyToken, getDrones);     // View all drones

module.exports = router;
