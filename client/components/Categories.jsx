import React from "react";

function Categories({ categories, currentCategory, selectCategory }) {

  return (
    <section className="button-container">
      <button
        name={"All"}
        className={currentCategory == "All" ? "button-selected" : "button"}
        onClick={selectCategory}
      >
        All
      </button>
      {categories && categories.map((category, i) => (
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
