import React, { useState, useEffect } from "react";
import { useExpensesContext } from "../context/ExpensesContext";

function DeleteCategory({ categories, fetchCategories, deleteCategory }) {
  const { heb } = useExpensesContext();
  const [choice, setChoice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await deleteCategory(choice);
    await fetchCategories();
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
