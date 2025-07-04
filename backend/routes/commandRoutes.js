/**
 * @swagger
 * /api/commands:
 *   post:
 *     summary: Send command to drone
 *     tags: [Command]
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
 *                 example: DR-101
 *               command:
 *                 type: string
 *                 enum: [abort, reroute, return]
 *                 example: abort
 *     responses:
 *       201:
 *         description: Command created and stored
 *       400:
 *         description: Invalid command type
 *       403:
 *         description: Unauthorized or missing token
 *       500:
 *         description: Server error
 */

const express = require("express");
const router = express.Router();

const { sendCommand } = require("../controllers/commandController");
const verifyToken = require("../middleware/verifyToken"); // Protect the route with JWT

// POST /api/commands — Send command to a drone
router.post("/", verifyToken, sendCommand);

// Export router to be mounted in server.js
module.exports = router;
