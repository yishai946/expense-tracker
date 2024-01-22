import "../styles/Expense.css";
import { useHomeContext } from "../context/HomeContext";

export default function Item({ item, deleteItem, editItem }) {
  const { fetchBalance } = useHomeContext();

  const handleDelete = async () => {
    await deleteItem(item._id);
    await fetchBalance();
  };

  return (
    <div className="card">
      <p style={{ fontWeight: "bolder", marginBottom: 5 }}>{item.name}</p>
      <div className="date">
        <p>{item.date.replace(/-/g, "/")}</p>
        <p>{item.time.slice(0, 5)}</p>
      </div>
      <div className="details">
        <div className="name">
          <p>{item.category}</p>
        </div>
        <div className="price">
          <p>{item.amount}₪</p>
        </div>
      </div>
      <div className="buttons">
        <button className="buttonText" onClick={handleDelete}>
          Delete
        </button>
        |
        <button className="buttonText" onClick={() => editItem(item)}>
          Edit
        </button>
      </div>
    </div>
  );
}
