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
        new Date(date)
      );
      const totalIncomes = await IncomeCollection.totalIncomes(
        userId,
        new Date(date)
      );
      const balance = totalIncomes.total - totalExpenses.total;
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
      const newDate = new Date(date);
      const totalExpenses = await ExpensesCollection.totalExpenses(
        userId,
        newDate
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
      const newDate = new Date(date);
      const totalIncomes = await IncomeCollection.totalIncomes(userId, newDate);
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

  // get expenses last month
  getExpensesLastMonth: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { date } = req.params;

      // get array of expenses for last 30 days
      const expenses = [];

      for (let i = 30; i > 0; i--) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - i);

        expenses.push(ExpensesCollection.totalExpenses(userId, newDate));
      }

      const expensesArr = await Promise.all(expenses);

      res.json({ expensesArr });
    } catch (err) {
      console.error(`Error getting expenses: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },

  // get incomes last month
  getIncomesLastMonth: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { date } = req.params;

      // get array of incomes for last 30 days
      const incomes = [];

      for (let i = 30; i > 0; i--) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - i);

        incomes.push(IncomeCollection.totalIncomes(userId, newDate));
      }

      const incomesArr = await Promise.all(incomes);

      res.json({ incomesArr });
    } catch (err) {
      console.error(`Error getting incomes: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },

  // get expenses percentage
  getExpensesPercentage: async (req, res) => {
    try {
      const { userId } = req.userId;
      const { dateStart, dateEnd } = req.query;

      const newDateStart = new Date(dateStart);
      const newDateEnd = new Date(dateEnd);

      // get the user expenses
      const amount = (
        await ExpensesCollection.totalExpenses(userId, newDateEnd)
      ).total;

      const { above, bellow } = await ExpensesCollection.getExpensesPercentage(
        userId,
        newDateStart,
        newDateEnd,
        amount
      );

      const percentage = (bellow / (above + bellow + 1)) * 100;

      res.json({ percentage });
    } catch (err) {
      console.error(`Error getting expenses percentage: ${err}`);
      res.status(500).json({ error: err.message });
    }
  },
};
