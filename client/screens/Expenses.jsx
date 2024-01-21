import React from "react";
import AddCategory from "../components/AddCategory";
import Categories from "../components/Categories";
import DeleteCategory from "../components/DeleteCategory";
import List from "../components/List";
import LogoutButton from "../components/LogoutButton";
import Navigator from "../components/Navigator";
import Form from "../components/Form";
import { useExpensesContext } from "../context/ExpensesContext";
import "../styles/App.css";

export default function Expenses() {
  const {
    expenses,
    addExpense,
    deleteExpenseCategory,
    addExpenseCategory,
    fetchExpenses,
    deleteExpense,
    fetchCategoriesExpenses,
    categoriesExpenses,
    currentExpenseCategory,
    selectExpenseCategory,
    editExpense,
  } = useExpensesContext();

  const [edit, setEdit] = React.useState(false);
  const [expenseToEdit, setExpenseToEdit] = React.useState({});
  const cancel = () => {
    setEdit(false);
    setExpenseToEdit({});
  };
  const activateEdit = (item) => {
    setEdit(true);
    setExpenseToEdit(item);
  };

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
        <Form
          add={edit ? null : addExpense}
          edit={edit ? editExpense : null}
          fetch={fetchExpenses}
          categories={categoriesExpenses}
          item={edit ? expenseToEdit : null}
          cancel={edit ? cancel : null}
        />
        <List
          data={expenses}
          currentCategory={currentExpenseCategory}
          deleteItem={deleteExpense}
          editItem={activateEdit}
        />
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
