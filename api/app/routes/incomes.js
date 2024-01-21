const express = require('express');
const router = express.Router();
const services = require('../services/incomes');
const {validateToken} = require('../middleware/auth');

// new income route
router.post("/add", validateToken, services.createIncome);

// get all expenses route
router.get("/getAll", validateToken, services.getAllIncomes);

// get income by id route
router.get("/getOne/:id", validateToken, services.getIncomeById);

// get expenses by category
router.get("/getByCategory/:category", validateToken, services.getIncomesByCategory);

// update income route
router.put("/update/:id", validateToken, services.updateIncome);

// delete income route
router.delete("/delete/:id", validateToken, services.deleteIncome);


module.exports = router;