import React from "react";
import AddCategory from "../components/AddCategory";
import Categories from "../components/Categories";
import DeleteCategory from "../components/DeleteCategory";
import Form from "../components/Form";
import List from "../components/List";
import LogoutButton from "../components/LogoutButton";
import Navigator from "../components/Navigator";
import { useIncomesContext } from "../context/IncomesContext";
import "../styles/App.css";

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
    deleteIncome,
    editIncome,
  } = useIncomesContext();

  const [edit, setEdit] = React.useState(false);
  const [incomeToEdit, setIncomeToEdit] = React.useState({});
  const cancel = () => {
    setEdit(false);
    setIncomeToEdit({});
  };
  const activateEdit = (item) => {
    setEdit(true);
    setIncomeToEdit(item);
  };

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
        <Form
          add={edit ? null : addIncome}
          edit={edit ? editIncome : null}
          fetch={fetchIncomes}
          categories={categoriesIncomes}
          item={edit ? incomeToEdit : null}
          cancel={edit ? cancel : null}
        />
        <List
          data={incomes}
          currentCategory={currentIncomeCategory}
          deleteItem={deleteIncome}
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
