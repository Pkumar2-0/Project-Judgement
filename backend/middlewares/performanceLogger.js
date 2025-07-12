// Logs HTTP method, URL, status, and response time for each API call
const performanceLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} → ${res.statusCode} in ${duration}ms`);
  });

  next();
};

module.exports = performanceLogger;
