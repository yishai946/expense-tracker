import React, { useState } from "react";
import categoriesFunctions from "../functions/categoriesExpenses";
import { useExpensesContext } from "../context/ExpensesContext";

function AddCategory({ fetchCategories, addCategory }) {
  const { heb } = useExpensesContext();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCategory({ category: input });
    fetchCategories();
    setInput("");
  };

  return (
    <section className="addCategory">
      <form onSubmit={handleSubmit}>
        <input
          placeholder={heb ? "הוסף קטגוריה" : "Add new categroy"}
          type="text"
          name="category"
          className="input"
          required
          autoComplete="off"
          value={input}
          onChange={handleChange}
        />
        <button type="submit" className="button">
          {heb ? "הוסף" : "Add"}
        </button>
      </form>
    </section>
  );
}

export default AddCategory;
