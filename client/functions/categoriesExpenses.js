const categoriesExpensesFunctions = {
  addCategory: async (category) => {
    try {
      // send new category request to server
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API}/api/users/add-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(category),
        }
      );

      categoriesExpensesFunctions.checkAuth(response);

      // return response
      return response.json();
    } catch (err) {
      console.log(err);
    }
  },

  getCategories: async () => {
    try {
      // send get categories request to server
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API}/api/users/get-categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      categoriesExpensesFunctions.checkAuth(response);

      // return response
      return response.json();
    } catch (err) {
      console.log(err);
    }
  },

  deleteCategory: async (category) => {
    try {
      // send delete category request to server
      const response = await fetch(
        `${import.meta.env.VITE_REACT_API}/api/users/delete-category/${category}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      categoriesExpensesFunctions.checkAuth(response);

      // return response
      return response.json();
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

export default categoriesExpensesFunctions;
