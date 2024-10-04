const UsersCollection = require("../db/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
  // create new user
  createUser: async (req, res) => {
    const user = process.env.EMAIL;
    const pass = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
    try {
      const { email, password, username, name } = req.body;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // create the user doc
      const user = await UsersCollection.create(
        email,
        hashedPassword,
        username,
        name
      );

      const verificationToken = jwt.sign(
        { userId: user.insertedId }, // use `user.insertedId` instead of `user._id`
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      const verificationUrl = `${process.env.FRONTEND_BASE_URL}/verify-email?token=${verificationToken}`;
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        html: `
          <h2>Welcome to Our App!</h2>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
        `,
      });

      res.status(200).json({
        success: true,
        message: "User created successfully, please verify your email",
      });
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

  // Verify user email
  verifyEmail: async (req, res) => {
    const { token } = req.query;

    console.log("token : ", token);

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log("decoded : ", decoded);
      const userId = decoded.userId;
      console.log("userId : ", userId);

      // Find the user and mark as verified
      const user = await UsersCollection.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "Invalid token" });
      }

      // Update user to set verified to true
      await UsersCollection.updateVerifiedStatus(userId, true);

      res
        .status(200)
        .json({ success: true, message: "Email successfully verified" });
    } catch (err) {
      console.error(`Error verifying email: ${err}`);
      res.status(400).json({ error: "Invalid or expired token" });
    }
  },

  //   login user
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await UsersCollection.findByUsername(username);

      if (!user) {
        return res.status(400).json({ error: `username not found` });
      }

      // Check if the user is verified
      if (!user.verified) {
        return res
          .status(400)
          .json({ error: "Please verify your email before logging in." });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: "240h",
      });

      const expiry = new Date(Date.now() + 240 * 60 * 60 * 1000);

      return res.status(200).json({ token, expiry, userId: user._id });
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
