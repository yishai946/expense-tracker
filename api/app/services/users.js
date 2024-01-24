const UsersCollection = require("../db/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // create new user
  createUser: async (req, res) => {
    try {
      const { email, password, username, name } = req.body;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // create the user doc
      await UsersCollection.create(email, hashedPassword, username, name);

      res
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (err) {
      if (
        err.message === "email already exist" ||
        err.message === "username already exist"
      ) {
        console.error(`Error creating user: ${err}`);
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
        expiresIn: "12h",
      });

      const expiry = new Date(Date.now() + 12 * 60 * 60 * 1000);

      res.status(200).json({ token, expiry, userId: user._id });
    } catch (err) {
      console.error(`Error authenticating user: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //   delete user
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.userId;

      await UsersCollection.deleteUser(userId);

      res.status(200).json({ success: true, message: "User deleted" });
    } catch (err) {
      console.error(`Error deleting user: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //  add category
  addCategory: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { category } = req.body;

      await UsersCollection.addCategory(userId, category);

      res.status(200).json({ success: true, message: "Category added" });
    } catch (err) {
      if (err.message === "Error adding category: category already exist") {
        return res.status(400).json({ error: err.message });
      }
      console.error(`Error adding category: ${err}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //   delete category
  deleteCategory: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { category } = req.params;

      await UsersCollection.deleteCategory(userId, category);

      res.status(200).json({ success: true, message: "Category deleted" });
    } catch (err) {
      console.error(`Error deleting category: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //   get categories
  getCategories: async (req, res) => {
    try {
      const { userId } = req.userId;

      const user = await UsersCollection.findById(userId);

      res.status(200).json({ categories: user.categories || [] });
    } catch (err) {
      console.error(`Error getting categories: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //   add income category
  addIncomeCategory: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { category } = req.body;

      await UsersCollection.addIncomeCategory(userId, category);

      res.status(200).json({ success: true, message: "Category added" });
    } catch (err) {
      if (err.message === "Error adding category: category already exist") {
        return res.status(400).json({ error: err.message });
      }
      console.error(`Error adding category: ${err}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //   delete income category
  deleteIncomeCategory: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { category } = req.params;

      await UsersCollection.deleteIncomeCategory(userId, category);

      res.status(200).json({ success: true, message: "Category deleted" });
    } catch (err) {
      console.error(`Error deleting category: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  //   get income categories
  getIncomeCategories: async (req, res) => {
    try {
      const { userId } = req.userId;

      const user = await UsersCollection.findById(userId);

      res.status(200).json({ categories: user.incomeCategories });
    } catch (err) {
      console.error(`Error getting categories: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
