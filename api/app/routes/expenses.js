const services = require("../services/expenses");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");

// new expense route
router.post("/add", validateToken, services.createExpense);

// get all expenses route
// router.get("/all", validateToken, services.getAllExpenses);

// get expense by id route
// router.get("/:id", validateToken, services.getExpenseById);

// update expense route
// router.put("/update/:id", validateToken, services.updateExpense);

// delete expense route
// router.delete("/delete/:id", validateToken, services.deleteExpense);

module.exports = router;