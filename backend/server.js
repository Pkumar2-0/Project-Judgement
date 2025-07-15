const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());


// DB connection
const sequelize = require('./config/db');

// Routes (Week 1 only)
const authRoutes = require('./routes/authRoutes');
const telemetryRoutes = require('./routes/telemetryRoutes');

// Swagger setup (if used)
const { swaggerUi, specs } = require('./swagger');

// Error handler (if you've added one)
const errorHandler = require('./middlewares/errorHandler');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req, res) => {
  res.send('✅ Secure Backend is Running over HTTPS');
});

// Error handling middleware
app.use(errorHandler);

// DB Connect & Start Server
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected');
    return sequelize.sync(); // Sync tables
  })
  .then(() => {
    const https = require('https');
const fs = require('fs');

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const PORT = process.env.PORT || 5000;

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`✅ Secure HTTPS server running on https://localhost:${PORT}`);
});

  })
  .catch(err => console.error('DB Connection Error:', err));

