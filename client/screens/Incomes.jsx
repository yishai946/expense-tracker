import "../styles/App.css";
import { useIncomesContext } from "../context/IncomesContext";
import AddCategory from "../components/AddCategory";
import DeleteCategory from "../components/DeleteCategory";
import Categories from "../components/Categories";
import NewItem from "../components/NewItem";
import List from "../components/List";
import LogoutButton from "../components/LogoutButton";
import Navigator from "../components/Navigator";

export default function Incomes() {
  const {
    incomes,
    addIncome,
    deleteIncomeCategory,
    addIncomeCategory,
    fetchIncomes,
    fetchCategoriesIncomes,
    categoriesIncomes,
    currentIncomeCategory,
    selectIncomeCategory,
  } = useIncomesContext();

  return (
    <>
      <Navigator />
      <LogoutButton />
      <h1>Income Tracker</h1>
      <Categories
        categories={categoriesIncomes}
        selectCategory={selectIncomeCategory}
        currentCategory={currentIncomeCategory}
      />
      <div className="container">
        <div className="miniContainer">
          <AddCategory
            fetchCategories={fetchCategoriesIncomes}
            addCategory={addIncomeCategory}
          />
          <DeleteCategory
            deleteCategory={deleteIncomeCategory}
            categories={categoriesIncomes}
            fetchCategories={fetchCategoriesIncomes}
          />
        </div>
        <NewItem
          add={addIncome}
          fetch={fetchIncomes}
          categories={categoriesIncomes}
        />
        <List data={incomes} currentCategory={currentIncomeCategory} />
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
