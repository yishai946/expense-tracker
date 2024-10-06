const baseUrl =
  "https://ir4ovq5ajyh2755u2jnjgj7oqi0bubsp.lambda-url.eu-north-1.on.aws";

const categoriesIncomesFunctions = {
  addCategory: async (category) => {
    try {
      // send new category request to server
      const response = await fetch(`${baseUrl}/api/users/add-income-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(category),
      });

      categoriesIncomesFunctions.checkAuth(response);

      // return response
      return response.json();
    } catch (err) {
      console.error(err);
    }
  },

  getCategories: async () => {
    try {
      // send get categories request to server
      const response = await fetch(
        `${baseUrl}/api/users/get-income-categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      categoriesIncomesFunctions.checkAuth(response);

      // return response
      return response.json();
    } catch (err) {
      console.error(err);
    }
  },

  deleteCategory: async (category) => {
    try {
      // send delete category request to server
      const response = await fetch(
        `${baseUrl}/api/users/delete-income-category/${category}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      categoriesIncomesFunctions.checkAuth(response);

      // return response
      return response.json();
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

export default categoriesIncomesFunctions;
