const redis = require('redis');

const client = redis.createClient(); // default localhost:6379

client.connect()
  .then(() => console.log("Redis connected"))
  .catch(err => console.error("Redis connection error:", err));

module.exports = client;
