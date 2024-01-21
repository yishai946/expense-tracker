import React from "react";
import Item from "./Item";

function List({ data, currentCategory, deleteItem, editItem }) {
  return (
    <div>
      <section className="expenses">
        {data
          .filter(
            (item) =>
              item.category === currentCategory || currentCategory === "All"
          )
          .map((item, i) => (
            <Item
              key={i}
              item={item}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          ))}
      </section>
    </div>
  );
}

export default List;
