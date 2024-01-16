import React, { useState, useEffect } from "react";
import categoriesFunctions from "../functions/categories";

function DeleteCategory({ heb }) {
  const [categories, setCategories] = useState([]);
  const [choice, setChoice] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await categoriesFunctions.getCategories();
      setCategories(response.categories);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await categoriesFunctions.deleteCategory({ category: choice });
    setCategories(categories.filter((category) => category !== choice));
    setChoice("");
  };

  const handleSelection = (event) => {
    event.preventDefault();
    const selection = event.target.value;
    setChoice(selection);
  };

  return categories ? (
    <section className="deleteCategory">
      <form onSubmit={handleSubmit}>
        <select
          name="selectOption"
          required
          onChange={handleSelection}
          className="select"
          defaultValue=""
        >
          <option value="" disabled>
            {heb ? "בחר קטגוריה" : "Select a category"}
          </option>
          {categories.map((category, i) => (
            <option value={category} key={i}>
              {category}
            </option>
          ))}
        </select>

        <button type="submit" className="button">
          {heb ? "מחק" : "Delete"}
        </button>
      </form>
    </section>
  ) : (
    <div>Loading...</div>
  );
}

export default DeleteCategory;
