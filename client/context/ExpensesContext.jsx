import { createContext, useContext, useState, useEffect } from "react";
import categoriesExpensesFunctions from "../functions/categoriesExpenses";
import ExpensesFunctions from "../functions/Expenses";

const ExpensesContext = createContext();

export const ExpensesProvider = ({ children }) => {
  const [categoriesExpenses, setCategoriesExpenses] = useState([]);
  const [currentExpenseCategory, setCurrentExpenseCategory] = useState("All");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCategoriesExpenses();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (currentExpenseCategory === "All") {
        fetchExpenses();
      } else {
        fetchExpenseByCategory();
      }
    }
  }, [currentExpenseCategory]);

  const fetchCategoriesExpenses = async () => {
    const response = await categoriesExpensesFunctions.getCategories();
    setCategoriesExpenses(response.categories);
  };

  const fetchExpenses = async () => {
    const response = await ExpensesFunctions.getExpenses();
    setExpenses(response.expenses);
  };

  const fetchExpenseByCategory = async () => {
    const response = await ExpensesFunctions.getExpensesByCategory(
      currentCategory
    );
    setExpenses(response.expenses);
  };

  const selectExpenseCategory = (event) => {
    event.preventDefault();
    setCurrentExpenseCategory(event.target.name);
  };

  const addExpenseCategory = async (category) => {
    await categoriesExpensesFunctions.addCategory(category);
  };

  const deleteExpenseCategory = async (category) => {
    await categoriesExpensesFunctions.deleteCategory(category);
  };

  const addExpense = async (expense) => {
    await ExpensesFunctions.addExpense(expense);
  };

  return (
    <ExpensesContext.Provider
      value={{
        deleteExpenseCategory,
        addExpenseCategory,
        categoriesExpenses,
        setCategoriesExpenses,
        fetchCategoriesExpenses,
        currentExpenseCategory,
        selectExpenseCategory,
        expenses,
        fetchExpenses,
        addExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => {
  return useContext(ExpensesContext);
};
