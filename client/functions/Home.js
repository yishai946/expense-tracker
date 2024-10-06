const baseUrl =
  "https://ir4ovq5ajyh2755u2jnjgj7oqi0bubsp.lambda-url.eu-north-1.on.aws/";

const HomeFunctions = {
  getBalance: async (date) => {
    const response = await fetch(`${baseUrl}/api/home/balance/${date}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    HomeFunctions.checkAuth(response);

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },

  getBalances: async (date) => {
    const response = await fetch(
      `${baseUrl}/api/home/balancesLastMonth/${date}`,
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
      `${baseUrl}/api/home/expensesLastMonth/${date}`,
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
      `${baseUrl}/api/home/incomesLastMonth/${date}`,
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
      const response = await fetch(`${baseUrl}/api/home/expensesByCategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      HomeFunctions.checkAuth(response);

      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (err) {
      console.error(err);
    }
  },

  getExpensesTotal: async (date) => {
    try {
      const response = await fetch(`${baseUrl}/api/home/expenses/${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      HomeFunctions.checkAuth(response);
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (err) {
      console.error(err);
    }
  },

  getIncomesTotal: async (date) => {
    try {
      const response = await fetch(`${baseUrl}/api/home/incomes/${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      HomeFunctions.checkAuth(response);

      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (err) {
      console.error(err);
    }
  },

  getExpensesPercentage: async (dateStart, dateEnd) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/home/expensesPercentage?dateStart=${dateStart}&dateEnd=${dateEnd}`,
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
      console.error(err);
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
