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
    } catch (err) {
      if (err == `email already exist` || err == `username already exist`) {
        res.status(400).json({ error: err });
      } else {
        res.status(500).send({ error: err });
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
      console.log(`Error authenticating user: ${err}`);
      res.status(500).json({ error: err });
    }
  },
};
