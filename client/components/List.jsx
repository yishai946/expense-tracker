import React from "react";
import Item from "./Item";

function List({data, currentCategory}) {
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
              name={item.name}
              price={item.amount}
              date={item.date}
              time={item.time}
              category={item.category}
              key={i}
            />
          ))}
      </section>
    </div>
  );
}

export default List;
