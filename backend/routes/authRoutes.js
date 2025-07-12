/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and authorization
 */

const express = require('express');
const router = express.Router();
const { signup, login, refreshToken, logout} = require('../controllers/authController');

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jasmin jamadar
 *               email:
 *                 type: string
 *                 example: jasmin@example.com
 *               password:
 *                 type: string
 *                 example: mysecurepassword
 *               role:
 *                 type: string
 *                 enum: [admin, operator]
 *                 example: operator
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or user already exists
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in and receive JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jasmin@example.com
 *               password:
 *                 type: string
 *                 example: mysecurepassword
 *     responses:
 *       200:
 *         description: JWT and refresh token returned
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/v1/auth/token:
 *   post:
 *     summary: Get a new access token using a refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: New access token returned
 *       401:
 *         description: Refresh token required
 *       403:
 *         description: Invalid or expired refresh token
 */

router.post('/signup', signup);
router.post('/login', login);
router.post('/token', refreshToken); // NEW: Refresh token route
router.post('/logout', logout); // Invalidate refresh token

module.exports = router;
