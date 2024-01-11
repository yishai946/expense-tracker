import "./Expense.css";

export default function expense({ name, price, date, time, category }) {
  return (
    <div className="card">
      <div className="date">
        <p>{date}{"  "}{time}</p>
      </div>
      <div className="details">
        <div className="name">
          <p>{name}</p>
        </div>
        <div className="price">
          <p>{price}₪</p>
        </div>
      </div>
    </div>
  );
}
