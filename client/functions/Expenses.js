const ExpensesFunctions = {
  // get all expenses
  getExpenses: async () => {
    try {
      const response = await fetch(
        "https://finance-tracker-ads91q59j-yishai946s-projects.vercel.app/api/expenses/getAll",
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
      console.log(error);
    }
  },

  // get expense by category
  getExpensesByCategory: async (category) => {
    try {
      const response = await fetch(
        `https://finance-tracker-ads91q59j-yishai946s-projects.vercel.app/api/expenses/getByCategory/${category}`,
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
      console.log(error);
    }
  },

  addExpense: async (expense) => {
    try {
      const response = await fetch("https://finance-tracker-ads91q59j-yishai946s-projects.vercel.app/api/expenses/add", {
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
      console.log(error);
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await fetch(
        `https://finance-tracker-ads91q59j-yishai946s-projects.vercel.app/api/expenses/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      ExpensesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  editExpense: async (expense, id) => {
    try {
      const response = await fetch(
        `https://finance-tracker-ads91q59j-yishai946s-projects.vercel.app/api/expenses/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(expense),
        }
      );

      ExpensesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.log(error);
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
