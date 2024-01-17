import "../styles/App.css";
import { useAppContext } from "../AppContext";
import AddCategory from "../components/AddCategory";
import DeleteCategory from "../components/DeleteCategory";
import Lang from "../components/Lang";
import Categories from "../components/Categories";
import NewExpense from "../components/NewExpense";
import ExpensesList from "../components/ExpensesList";
import LogoutButton from "../components/LogoutButton";
import Navigator from "../components/Navigator";

export default function Expenses() {
  const { heb } = useAppContext();

  return (
    <>
      <Navigator />
      <Lang />
      <LogoutButton />
      <h1>
        {heb ? "מעקב הוצאות" : "Expense Tracker"}
      </h1>
      <Categories />
      <div className="container">
        <div className="miniContainer">
          <AddCategory heb={heb} />
          <DeleteCategory heb={heb} />
        </div>
        <NewExpense />
        <ExpensesList />
      </div>

      {/* <section className="total" id="total">
        <p>
          {heb ? "בסך הכל: " : "Total: "}
          {total}₪
        </p>
      </section> */}
    </>
  );
}
