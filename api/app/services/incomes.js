const IncomesCollection = require("../db/incomes");

module.exports = {
  // create new income
  createIncome: async (req, res) => {
    try {
      const { name, amount, date, time, category } = req.body;
      const { userId } = req.userId;
      await IncomesCollection.create(
        name,
        amount,
        date,
        time,
        category,
        userId
      );
      res
        .status(200)
        .json({ success: true, message: "Income added successfully" });
    } catch (err) {
      console.error(`Error adding income: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // get all incomes
  getAllIncomes: async (req, res) => {
    try {
      const { userId } = req.userId;
      const incomes = await IncomesCollection.getAll(userId);
      res.status(200).json({ success: true, incomes });
    } catch (err) {
      console.error(`Error getting all incomes: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // get income by id
  getIncomeById: async (req, res) => {
    try {
      const { id } = req.params;
      const income = await IncomesCollection.findById(id);
      res.status(200).json({ success: true, income });
    } catch (err) {
      console.error(`Error getting income by id: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // get incomes by category
  getIncomesByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const { userId } = req.userId;
      const incomes = await IncomesCollection.findByCategory(
        category,
        userId
      );
      res.status(200).json({ success: true, incomes });
    } catch (err) {
      console.error(`Error getting incomes by category: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // update income
  updateIncome: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, amount, date, category } = req.body;
      await IncomesCollection.update(id, name, amount, date, category);
      res
        .status(200)
        .json({ success: true, message: "Income updated successfully" });
    } catch (err) {
      console.error(`Error updating income: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // delete income
  deleteIncome: async (req, res) => {
    try {
      const { id } = req.params;
      await IncomesCollection.delete(id);
      res
        .status(200)
        .json({ success: true, message: "Income deleted successfully" });
    } catch (err) {
      console.error(`Error deleting income: ${err}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
