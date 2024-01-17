const services = require("../services/expenses");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");

// new expense route
router.post("/add", validateToken, services.createExpense);

// get all expenses route
router.get("/getAll", validateToken, services.getAllExpenses);

// get expense by id route
router.get("/getOne/:id", validateToken, services.getExpenseById);

// get expenses by category
router.get("/getByCategory/:category", validateToken, services.getExpensesByCategory);

// update expense route
router.put("/update/:id", validateToken, services.updateExpense);

// delete expense route
router.delete("/delete/:id", validateToken, services.deleteExpense);

module.exports = router;