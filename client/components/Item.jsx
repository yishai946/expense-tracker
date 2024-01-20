import "../styles/Expense.css";

export default function Item({ name, price, date, time, category }) {
  return (
    <div className="card">
      <p>{name}</p>
      <div className="date">
        <p>
          {date.replace(/-/g, "/")}
          {"  "}      
          {time.slice(0, 5)}
        </p>
      </div>
      <div className="details">
        <div className="name">
          <p>{category}</p>
        </div>
        <div className="price">
          <p>{price}₪</p>
        </div>
      </div>
    </div>
  );
}
