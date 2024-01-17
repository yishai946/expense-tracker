import React, { useState } from "react";
import { useAppContext } from "../AppContext";

function Categories() {
  const { categories, heb, currentCategory, selectCategory } = useAppContext();

  return (
    <section className="button-container">
      <button
        name={"All"}
        className={currentCategory == "All" ? "button-selected" : "button"}
        onClick={selectCategory}
      >
        {heb ? "הכל" : "All"}
      </button>
      {categories.map((category, i) => (
        <button
          key={i}
          name={category}
          className={currentCategory == category ? "button-selected" : "button"}
          onClick={selectCategory}
        >
          {category}
        </button>
      ))}
    </section>
  );
}

export default Categories;
