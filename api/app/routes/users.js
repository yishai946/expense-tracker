const services = require("../services/users");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");

// try
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(200);
});

// signup
router.post("/signup", services.createUser);

// login
router.post("/login", services.login);

//  delete user
router.delete("/delete-user", validateToken, services.deleteUser);

// add category
router.post("/add-category", validateToken, services.addCategory);

// get categories
router.get("/get-categories", validateToken, services.getCategories);

// delete category
router.delete(
  "/delete-category/:category",
  validateToken,
  services.deleteCategory
);

// add income category
router.post("/add-income-category", validateToken, services.addIncomeCategory);

// get income categories
router.get(
  "/get-income-categories",
  validateToken,
  services.getIncomeCategories
);

// delete income category
router.delete(
  "/delete-income-category/:category",
  validateToken,
  services.deleteIncomeCategory
);

module.exports = router;
