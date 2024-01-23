const express = require('express');
const router = express.Router();
const services = require('../services/home');
const { validateToken } = require('../middleware/auth');

// get balance
router.get("/balance/:date", validateToken, services.getBalanceByDate);

// get total expenses
router.get("/expenses/:date", validateToken, services.getTotalExpensesByDate);

// get total incomes
router.get("/incomes/:date", validateToken, services.getTotalIncomesByDate);

// get expenses by categories
router.get('/expensesByCategories', validateToken, services.expensesTotalByCategories);

// get incomes by categories
router.get('/incomesByCategories', validateToken, services.incomesTotalByCategories);

// get expenses last month
router.get("/expensesLastMonth/:date", validateToken, services.getExpensesLastMonth);

// get incomes last month
router.get("/incomesLastMonth/:date", validateToken, services.getIncomesLastMonth);

module.exports = router;