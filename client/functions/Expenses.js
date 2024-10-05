const baseUrl = "https://5c6prkkgx4.execute-api.eu-north-1.amazonaws.com/prod";

const ExpensesFunctions = {
  // get all expenses
  getExpenses: async () => {
    try {
      const response = await fetch(`${baseUrl}/api/expenses/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      ExpensesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // get expense by category
  getExpensesByCategory: async (category) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/expenses/getByCategory/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      ExpensesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  addExpense: async (expense) => {
    try {
      const response = await fetch(`${baseUrl}/api/expenses/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(expense),
      });

      ExpensesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/expenses/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      ExpensesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  editExpense: async (expense, id) => {
    try {
      const response = await fetch(`${baseUrl}/api/expenses/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(expense),
      });

      ExpensesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  checkAuth: (response) => {
    // check if token and expiry exist
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiry");
      window.location.href = "/signin";
      return false;
    }
    return true;
  },
};

export default ExpensesFunctions;
