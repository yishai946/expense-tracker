const ExpensesCollection = require("../db/expenses");

module.exports = {
    createExpense: async (req, res) => {
        try {
            const { title, amount, date, category } = req.body;
            const { userId } = req.user;
            await ExpensesCollection.create(title, amount, date, category, userId);
            res.status(200).json({ success: true, message: "Expense added successfully" });
        } catch (err) {
            console.error(`Error adding expense: ${err}`);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },                              
}