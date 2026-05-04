const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. header theke token ne
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    // 2. token extract
    const token = authHeader.split(" ")[1];

    // 3. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. req e user info attach
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
};

module.exports = authMiddleware;