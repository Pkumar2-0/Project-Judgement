const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const telemetryRoutes = require('./routes/telemetryRoutes');
const privateRoutes = require('./routes/privateRoutes');
const missionRoutes = require('./routes/missionRoutes');
const alertRoutes = require('./routes/alertRoutes');
const { swaggerUi, specs } = require('./swagger');
const errorHandler = require('./middleware/errorHandler');
const commandRoutes = require('./routes/commandRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(errorHandler);
app.use('/api/commands', commandRoutes);
app.use('/api/missions', require('./routes/missionRoutes'));
app.use('/api/logs', require('./routes/logRoutes'));
app.use('/api/drones', require('./routes/droneRoutes'));



// Error handling middleware
app.use(errorHandler);

// DB Connect & Start Server
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected');
    return sequelize.sync(); // Sync tables
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB Connection Error:', err));
