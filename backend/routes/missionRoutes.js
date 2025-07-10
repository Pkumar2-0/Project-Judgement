/**
 * @swagger
 * /api/missions:
 *   post:
 *     summary: Create a new mission (admin only)
 *     tags: [Mission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               objective:
 *                 type: string
 *               status:
 *                 type: string
 *               assignedDrone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mission created
 */

/**
 * @swagger
 * /api/missions:
 *   get:
 *     summary: Get all missions
 *     tags: [Mission]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of missions
 */

// Import necessary modules
const express = require('express');
const router = express.Router();

// Import controller functions
const { createMission, getMissions, updateMission } = require('../controllers/missionController');

// Import middleware
const verifyToken = require('../middleware/verifyToken');     // Checks JWT
const roleCheck = require('../middleware/roleCheck');         // Checks if role = 'admin'

// Import Mission model for deletion
const { Mission } = require('../models');

// GET /api/missions/:id - Fetch a mission by its ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const mission = await Mission.findByPk(id);

    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }

    res.json(mission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mission' });
  }
});


// DELETE /api/missions/:id
// Deletes a mission by ID — only admin can perform this action
router.delete('/:id', verifyToken, roleCheck('admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Mission.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: 'Mission not found' });

    res.json({ message: 'Mission deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete mission' });
  }
});

// POST /api/missions
// Create new mission — only 'admin' can do this
router.post('/', verifyToken, roleCheck('admin'), createMission);

// GET /api/missions
// Fetch all missions (any authenticated user can access)
router.get('/', verifyToken, getMissions);

// PUT /api/missions/:id
// Update mission info
router.put('/:id', verifyToken, roleCheck('admin'), updateMission);

// Export router to be used in server.js
module.exports = router;
