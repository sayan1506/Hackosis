
const jwt = require("jsonwebtoken");

r
const authMiddleware = (roles = []) => {
  return (req, res, next) => {
 
    let token = req.headers["authorization"]?.split(" ")[1];

    if (!token && req.cookies?.token) token = req.cookies.token;

    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
