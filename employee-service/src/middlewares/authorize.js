const authorize = (...roles) => {
  return (req, res, next) => {

    // Check role permission
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Access denied",
      });
    }

    next();
  };
};

module.exports = authorize;