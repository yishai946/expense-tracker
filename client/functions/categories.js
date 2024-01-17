const categoriesFunctions = {
  addCategory: async (category) => {
    try {
      // send new category request to server
      const response = await fetch(
        "http://localhost:3000/api/users/add-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(category),
        }
      );
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
        "http://localhost:3000/api/users/get-categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
        `http://localhost:3000/api/users/delete-category/${category}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // return response
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }
};

export default categoriesFunctions;
