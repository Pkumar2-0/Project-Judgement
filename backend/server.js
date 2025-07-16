const express = require('express');
const cors = require('cors');
const http = require('http'); // Wrap express with HTTP server
const helmet = require('helmet');
const responseTime = require('response-time');
const performanceLogger = require('./middleware/performanceLogger');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Create HTTP server from Express

const { Server } = require('socket.io');

// WebSocket setup
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Attach io to app for controller access
app.set('io', io);

// WebSocket connection event
io.on('connection', (socket) => {
  console.log('WebSocket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(helmet()); // Helmet security middleware
app.use(responseTime()); // Log response times
app.use(express.json());
app.use(performanceLogger);

// Routes
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const telemetryRoutes = require('./routes/telemetryRoutes');
const privateRoutes = require('./routes/privateRoutes');
const missionRoutes = require('./routes/missionRoutes');
const alertRoutes = require('./routes/alertRoutes');
const commandRoutes = require('./routes/commandRoutes');
const logRoutes = require('./routes/logRoutes');
const droneRoutes = require('./routes/droneRoutes');

// Swagger + error handler
const { swaggerUi, specs } = require('./swagger');
const errorHandler = require('./middleware/errorHandler');

// Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/telemetry', telemetryRoutes);
app.use('/api/v1/private', privateRoutes);
app.use('/api/v1/missions', missionRoutes);
app.use('/api/v1/alerts', alertRoutes);
app.use('/api/v1/commands', commandRoutes);
app.use('/api/v1/logs', logRoutes);
app.use('/api/v1/drones', droneRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Global Error Handler
app.use(errorHandler);

// DB connect and start server
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected');
    return sequelize.sync();
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server + WebSocket running on port ${PORT}`));
  })
  .catch(err => console.error('DB Connection Error:', err));
