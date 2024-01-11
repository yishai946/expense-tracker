const services = require("../services/users");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");

// new user route
router.post("/signup", services.createUser);

// login route
router.post("/login", services.login);


module.exports = router;
