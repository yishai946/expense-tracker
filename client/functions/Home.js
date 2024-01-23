const HomeFunctions = {
  getBalance: async (date) => {
    const response = await fetch(
      `http://localhost:3000/api/home/balance/${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    HomeFunctions.checkAuth(response);

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },

  getBalances: async (date) => {
    const response = await fetch(
      `http://localhost:3000/api/home/balancesLastMonth/${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    HomeFunctions.checkAuth(response);

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },

  getExpenses: async (date) => {
    const response = await fetch(
      `http://localhost:3000/api/home/expensesLastMonth/${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    HomeFunctions.checkAuth(response);

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },

  getIncomes: async (date) => {
    const response = await fetch(
      `http://localhost:3000/api/home/incomesLastMonth/${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    HomeFunctions.checkAuth(response);

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },

  getExpensesByCategory: async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/home/expensesByCategories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      HomeFunctions.checkAuth(response);

      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (err) {
      console.log(err);
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

export default HomeFunctions;
