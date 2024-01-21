import React, { useState } from "react";

function AddCategory({ fetchCategories, addCategory }) {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCategory({ category: input });
    await fetchCategories();
    setInput("");
  };

  return (
    <section className="addCategory">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add new categroy"
          type="text"
          name="category"
          className="input"
          required
          autoComplete="off"
          value={input}
          onChange={handleChange}
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
    </section>
  );
}

export default AddCategory;
