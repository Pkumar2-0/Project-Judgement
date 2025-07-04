// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const { createLog, getLogs } = require('../controllers/logController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createLog);
router.get('/', verifyToken, getLogs);

module.exports = router;
