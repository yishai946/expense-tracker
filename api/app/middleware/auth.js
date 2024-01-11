module.exports = {
  validateToken: (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      // No token provided, return 401 Unauthorized
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        // Token verification failed, return 401 Unauthorized
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }

      // Token is valid, attach the decoded payload to the request object
      req.userId = decoded.userId; // Adjust the property based on your token payload

      // Continue to the next middleware or route handler
      next();
    });
  },
};
