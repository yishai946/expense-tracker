import { createContext, useEffect, useState, useContext } from "react";
import IncomesFunctions from "../functions/Incomes";
import categoriesIncomesFunctions from "../functions/categoriesIncomes";

const IncomesContext = createContext();

export const IncomesProvider = ({ children }) => {
  const [categoriesIncomes, setCategoriesIncomes] = useState([]);
  const [currentIncomeCategory, setCurrentIncomeCategory] = useState("All");
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCategoriesIncomes();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      if (currentIncomeCategory === "All") {
        fetchIncomes();
      } else {
        fetchIncomeByCategory();
      }
    }
  }, [currentIncomeCategory]);

  const fetchCategoriesIncomes = async () => {
    const response = await categoriesIncomesFunctions.getCategories();
    setCategoriesIncomes(response.categories);
  };

  const fetchIncomes = async () => {
    const response = await IncomesFunctions.getIncomes();
    setIncomes(response.incomes);
  };

  const fetchIncomeByCategory = async () => {
    const response = await IncomesFunctions.getIncomesByCategory(
      currentCategory
    );
    setIncomes(response.incomes);
  };

  const selectIncomeCategory = (event) => {
    event.preventDefault();
    setCurrentIncomeCategory(event.target.name);
  };

  const addIncomeCategory = async (category) => {
    await categoriesIncomesFunctions.addCategory(category);
  };

  const deleteIncomeCategory = async (category) => {
    await categoriesIncomesFunctions.deleteCategory(category);
  };

  const addIncome = async (income) => {
    await IncomesFunctions.addIncome(income);
  };

  const deleteIncome = async (id) => {
    await IncomesFunctions.deleteIncome(id);
    await fetchIncomes();
  };

  const editIncome = async (income, id) => {
    await IncomesFunctions.editIncome(income, id);
  };

  return (
    <IncomesContext.Provider
      value={{
        categoriesIncomes,
        fetchCategoriesIncomes,
        addIncomeCategory,
        fetchIncomes,
        deleteIncomeCategory,
        currentIncomeCategory,
        selectIncomeCategory,
        incomes,
        addIncome,
        deleteIncome,
        editIncome,
      }}
    >
      {children}
    </IncomesContext.Provider>
  );
};

export const useIncomesContext = () => {
  return useContext(IncomesContext);
};
