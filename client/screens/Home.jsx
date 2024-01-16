import "../styles/App.css";
import Expense from "../components/Expense";
import { useState } from "react";
import AddCategory from "../components/AddCategory";
import DeleteCategory from "../components/DeleteCategory";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [choice, setChoice] = useState("");
  const [currentCategory, setCurrentCategory] = useState("All");
  const [heb, setHeb] = useState(true);
  const [total, setTotal] = useState(0);

  function addExpense(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;
    const timestamp = new Date(); // Get the current timestamp

    // Format date as "dd/mm/yyyy"
    const date = `${timestamp.getDate()}/${
      timestamp.getMonth() + 1
    }/${timestamp.getFullYear()}`;

    // Format time as "hh/mm"
    const hours = String(timestamp.getHours()).padStart(2, "0");
    const minutes = String(timestamp.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;

    const newExpense = {
      name: name,
      price: price,
      date: date,
      time: time,
      category: choice,
    };

    setExpenses([...expenses, newExpense]);
    setTotal(total + parseInt(price));

    // Clear the input fields
    setChoice("");
    event.target.name.value = "";
    event.target.price.value = "";
    event.target.selectOption.value = "";
  }

  function handleSelection(event) {
    event.preventDefault();
    const selection = event.target.value;
    setChoice(selection);
  }

  function selectCategory(event) {
    event.preventDefault();
    setCurrentCategory(event.target.name);
  }

  function changeLang(event) {
    setHeb(!heb);
  }

  return (
    <>
      <div className="btn-container">
        <label className="switch btn-color-mode-switch">
          <input
            value="1"
            id="color_mode"
            name="color_mode"
            type="checkbox"
            onClick={changeLang}
          />
          <label
            className="btn-color-mode-switch-inner"
            data-off="Heb"
            data-on="Eng"
            htmlFor="color_mode"
          ></label>
        </label>
      </div>
      <h1>{heb ? "מעקב הוצאות" : "Expense Tracker"}</h1>
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
            className={
              currentCategory == category ? "button-selected" : "button"
            }
            onClick={selectCategory}
          >
            {category}
          </button>
        ))}
      </section>
      <div className="container">
        <div>
          <AddCategory heb={heb} />
          <DeleteCategory heb={heb} />
        </div>

        <section className="newExpnse">
          <form onSubmit={addExpense}>
            <input
              placeholder={heb ? "שם" : "Name"}
              type="text"
              name="name"
              className="input"
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="price"
              className="input"
              placeholder={heb ? "מחיר" : "Price"}
              required
              autoComplete="off"
            />
            <select
              name="selectOption"
              required
              onChange={handleSelection}
              className="select"
              defaultValue=""
            >
              <option value="" disabled>
                {heb ? "בחר קטגוריה" : "Select a category"}
              </option>
              {categories.map((category, i) => (
                <option value={category} key={i}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              {heb ? "הוסף" : "Add"}
            </button>
          </form>
        </section>

        <div>
          <section className="expensions">
            {expenses
              .filter(
                (expense) =>
                  expense.category === currentCategory ||
                  currentCategory === "All"
              )
              .map((expense, i) => (
                <Expense
                  name={expense.name}
                  price={expense.price}
                  date={expense.date}
                  time={expense.time}
                  category={expense.category}
                  key={i}
                />
              ))}
          </section>
        </div>
      </div>
      <section className="total" id="total">
        <p>
          {heb ? "בסך הכל: " : "Total: "}
          {total}₪
        </p>
      </section>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expiry");
          window.location.href = "/signin";
        }}
      >
        logout
      </button>
    </>
  );
}
