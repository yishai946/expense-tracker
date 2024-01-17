import React, { useState } from "react";
import categoriesFunctions from "../functions/categories";
import { useAppContext } from "../AppContext";

function AddCategory() {
  const { fetchCategories, heb } = useAppContext();
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await categoriesFunctions.addCategory({ category: input });
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
