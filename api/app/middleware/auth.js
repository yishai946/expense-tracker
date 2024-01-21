const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, userId) => {
      console.log(err);

      if (err) return res.status(403).json({ error: "Forbidden" });

      req.userId = userId;

      next();
    });
  },
};
