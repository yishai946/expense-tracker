const UsersCollection = require("../db/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // create new user
  createUser: async (req, res) => {
    try {
      const { email, password, username } = req.body;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // create the user doc
      await UsersCollection.create(email, hashedPassword, username);

      res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (err) {
      if (
        err.message === "email already exist" ||
        err.message === "username already exist"
      ) {
        res.status(400).json({ error: err.message });
      } else {
        console.error(`Error creating user: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },

  //   login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UsersCollection.findByUsername(username);

      if (!user) {
        res.status(400).json({ error: `username not found` });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: "3h",
      });

      res.status(200).json({ token });
    } catch (err) {
      console.error(`Error authenticating user: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
