const ExpensesFunctions = {
  // get all expenses
  getExpenses: async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/expenses/getAll",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  // get expense by category
  getExpensesByCategory: async (category) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/expenses/getByCategory/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  addExpense: async (expense) => {
    try {
      console.log(JSON.stringify(expense));
      const response = await fetch("http://localhost:3000/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(expense),
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
};

export default ExpensesFunctions;
