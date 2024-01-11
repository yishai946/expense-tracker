const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_KEY, (err, userId) => {
      console.log(err);

      if (err) return res.sendStatus(403);

      req.userId = userId;

      next();
    });
  },
};
