import "../styles/App.css";
import { useExpensesContext } from "../context/ExpensesContext";
import AddCategory from "../components/AddCategory";
import DeleteCategory from "../components/DeleteCategory";
import Categories from "../components/Categories";
import NewItem from "../components/NewItem";
import List from "../components/List";
import LogoutButton from "../components/LogoutButton";
import Navigator from "../components/Navigator";

export default function Expenses() {
  const {
    expenses,
    addExpense,
    deleteExpenseCategory,
    addExpenseCategory,
    fetchExpenses,
    fetchCategoriesExpenses,
    categoriesExpenses,
    currentExpenseCategory,
    selectExpenseCategory,
  } = useExpensesContext();

  return (
    <>
      <Navigator />
      <LogoutButton />
      <h1>Expenses Tracker</h1>
      <Categories
        categories={categoriesExpenses}
        selectCategory={selectExpenseCategory}
        currentCategory={currentExpenseCategory}
      />
      <div className="container">
        <div className="miniContainer">
          <AddCategory
            fetchCategories={fetchCategoriesExpenses}
            addCategory={addExpenseCategory}
          />
          <DeleteCategory
            deleteCategory={deleteExpenseCategory}
            categories={categoriesExpenses}
            fetchCategories={fetchCategoriesExpenses}
          />
        </div>
        <NewItem
          add={addExpense}
          fetch={fetchExpenses}
          categories={categoriesExpenses}
        />
        <List data={expenses} currentCategory={currentExpenseCategory} />
      </div>

      {/* <section className="total" id="total">
        <p>
          Total:
          {total}₪
        </p>
      </section> */}
    </>
  );
}
