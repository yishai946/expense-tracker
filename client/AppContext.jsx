import { createContext, useContext, useState, useEffect } from "react";
import categoriesFunctions from "./functions/categories";
import ExpensesFunctions from "./functions/Expenses";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [heb, setHeb] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch initial categories and set them in the context
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentCategory === "All") {
      fetchExpenses();
    } else {
      fetchExpenseByCategory();
    }
  }, [currentCategory]);

  const changeLang = () => {
    setHeb(!heb);
  };

  const fetchCategories = async () => {
    const response = await categoriesFunctions.getCategories();
    setCategories(response.categories);
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

  const selectCategory = (event) => {
    event.preventDefault();
    setCurrentCategory(event.target.name);
  };

  return (
    <AppContext.Provider
      value={{
        categories,
        setCategories,
        fetchCategories,
        heb,
        changeLang,
        currentCategory,
        selectCategory,
        expenses,
        fetchExpenses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
