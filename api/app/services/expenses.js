const ExpensesCollection = require("../db/expenses");

module.exports = {

    // create new expense
    createExpense: async (req, res) => {
        try {
            const { name, amount, date, time, category } = req.body;
            const { userId } = req.userId;
            await ExpensesCollection.create(name, amount, date, time, category, userId);
            res.status(200).json({ success: true, message: "Expense added successfully" });
        } catch (err) {
            console.error(`Error adding expense: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },         

    // get all expenses
    getAllExpenses: async (req, res) => {
        try {
            const { userId } = req.userId;
            const expenses = await ExpensesCollection.getAll(userId);
            res.status(200).json({ success: true, expenses });
        } catch (err) {
            console.error(`Error getting all expenses: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // get expense by id
    getExpenseById: async (req, res) => {
        try {
            const { id } = req.params;
            const expense = await ExpensesCollection.findById(id);
            res.status(200).json({ success: true, expense });
        } catch (err) {
            console.error(`Error getting expense by id: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // get expenses by category
    getExpensesByCategory: async (req, res) => {
        try {
            const { category } = req.params;
            const { userId } = req.userId;
            const expenses = await ExpensesCollection.findByCategory(category, userId);
            res.status(200).json({ success: true, expenses });
        } catch (err) {
            console.error(`Error getting expenses by category: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // update expense
    updateExpense: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, amount, date, category } = req.body;
            await ExpensesCollection.update(id, name, amount, date, category);
            res.status(200).json({ success: true, message: "Expense updated successfully" });
        } catch (err) {
            console.error(`Error updating expense: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // delete expense
    deleteExpense: async (req, res) => {
        try {
            const { id } = req.params;
            await ExpensesCollection.delete(id);
            res.status(200).json({ success: true, message: "Expense deleted successfully" });
        } catch (err) {
            console.error(`Error deleting expense: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}