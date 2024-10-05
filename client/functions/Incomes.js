const baseUrl = "https://5c6prkkgx4.execute-api.eu-north-1.amazonaws.com/prod";

const IncomesFunctions = {
  // get all expenses
  getIncomes: async () => {
    try {
      const response = await fetch(`${baseUrl}/api/incomes/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      IncomesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  // get expense by category
  getIncomesByCategory: async (category) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/incomes/getByCategory/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      IncomesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  addIncome: async (income) => {
    try {
      const response = await fetch(`${baseUrl}/api/incomes/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(income),
      });

      IncomesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  //   delete income
  deleteIncome: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/incomes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      IncomesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },

  //   update income
  editIncome: async (income, id) => {
    try {
      const response = await fetch(`${baseUrl}/api/incomes/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(income),
      });

      IncomesFunctions.checkAuth(response);

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
    }
  },
};

export default IncomesFunctions;
