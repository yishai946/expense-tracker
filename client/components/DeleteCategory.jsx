import React, { useState } from "react";

function DeleteCategory({ categories, fetchCategories, deleteCategory }) {
  const [choice, setChoice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await deleteCategory(choice);
    fetchCategories();
    setChoice("");
  };

  const handleSelection = (event) => {
    event.preventDefault();
    const selection = event.target.value;
    setChoice(selection);
  };

  return (
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
            Select a category
          </option>
          {categories &&
            categories.map((category, i) => (
              <option value={category} key={i}>
                {category}
              </option>
            ))}
        </select>

        <button type="submit" className="button">
          Delete
        </button>
      </form>
    </section>
  );
}

export default DeleteCategory;
