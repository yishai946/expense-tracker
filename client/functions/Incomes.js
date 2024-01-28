const IncomesFunctions = {
  // get all expenses
  getIncomes: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API}/api/incomes/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      IncomesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  // get expense by category
  getIncomesByCategory: async (category) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API}/api/incomes/getByCategory/${category}`,
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
      console.log(error);
    }
  },

  addIncome: async (income) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API}/api/incomes/add`, {
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
      console.log(error);
    }
  },

  //   delete income
  deleteIncome: async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API}/api/incomes/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      IncomesFunctions.checkAuth(response);

      return response.json();
    } catch (error) {
      console.log(error);
    }
  },

  //   update income
  editIncome: async (income, id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API}/api/incomes/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(income),
        }
      );

      IncomesFunctions.checkAuth(response);

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
    }
  },
};

export default IncomesFunctions;
