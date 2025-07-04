// Role-based access control middleware
// Usage: Pass required role (e.g., "admin") and block users who don’t match

module.exports = (requiredRole) => {
  return (req, res, next) => {
    // Check if user is authenticated and has the correct role
    if (!req.user || req.user.role !== requiredRole) {
      // If no user info or role mismatch, deny access
      return res.status(403).json({ error: 'Access denied' });
    }

    // Role matches → allow request to continue
    next();
  };
};
