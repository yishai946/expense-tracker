const ExpensesCollection = require("../db/expenses");
const IncomeCollection = require("../db/incomes");

module.exports = {
  // get balance
  getBalanceByDate: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { date } = req.params;
      const totalExpenses = await ExpensesCollection.totalExpenses(
        userId,
        date
      );
      const totalIncomes = await IncomeCollection.totalIncomes(userId);
      const balance = totalIncomes - totalExpenses;
      res.json({ balance });
    } catch (err) {
      console.error(`Error getting balance: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },

  getTotalExpensesByDate: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { date } = req.params;
      const totalExpenses = await ExpensesCollection.totalExpenses(
        userId,
        date
      );
      res.json({ totalExpenses });
    } catch (err) {
      console.error(`Error getting total expenses: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },

  getTotalIncomesByDate: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { date } = req.params;
      const totalIncomes = await IncomeCollection.totalIncomes(userId, date);
      res.json({ totalIncomes });
    } catch (err) {
      console.error(`Error getting total incomes: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },

  expensesTotalByCategories: async (req, res) => {
    try {
      const { userId } = req.userId;

      const expenses = await ExpensesCollection.getTotalByCategories(userId);
      res.json({ expenses });
    } catch (err) {
      console.error(`Error getting expenses by category: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },

  incomesTotalByCategories: async (req, res) => {
    try {
      const { userId } = req.userId;

      const incomes = await IncomeCollection.getTotalByCategories(userId);
      res.json({ incomes });
    } catch (err) {
      console.error(`Error getting incomes by category: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },

  getBalancesLastMonth: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { date } = req.params;

      // get array of balances for last 30 days
      const balances = [];

      for (let i = 30; i > 0; i--) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - i);

        const totalExpenses = await ExpensesCollection.totalExpenses(
          userId,
          newDate
        );

        const totalIncomes = await IncomeCollection.totalIncomes(
          userId,
          newDate
        );

        const balance = totalIncomes - totalExpenses;
        balances.push({balance, date: newDate});
      }

      res.json({ balances });
    } catch (err) {
      console.error(`Error getting balance: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },
};
