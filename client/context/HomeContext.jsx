import { createContext, useEffect, useState, useContext } from "react";
import HomeFunctions from "../functions/Home";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const [balances, setBalances] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expensesByCategory, setExpensesByCategory] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const promises = [];
      promises.push(fetchBalance());
      promises.push(fetchExpenses());
      promises.push(fetchIncomes());
      promises.push(fetchExpensesByCategory());

      Promise.all(promises).then((result) => {
        const balancesArr = calculateBalances(
          result[1].expensesArr,
          result[2].incomesArr
        );
        setBalance(result[0].balance);
        setExpenses(result[1].expensesArr);
        setIncomes(result[2].incomesArr);
        setExpensesByCategory(result[3].expenses);
        setBalances(balancesArr);
      });
    }
  };

  const fetchBalance = async (date) => {
    if (!date) date = getFormattedDate();
    return HomeFunctions.getBalance(date);
  };

  const fetchExpensesByCategory = async () => {
    return HomeFunctions.getExpensesByCategory();
  };

  const calculateBalances = (expenses, incomes) => {
    if (expenses.length !== incomes.length) {
      console.error(
        "Error: Expenses and Incomes arrays must have the same length."
      );
      return;
    }

    const balancesArray = [];
    for (let i = 0; i < expenses.length; i++) {
      balancesArray.push({
        total: incomes[i].total - expenses[i].total || 0,
        date: expenses[i].date,
      });
    }
    return balancesArray;
  };

  const fetchExpenses = async (date) => {
    if (!date) date = getFormattedDate();
    return HomeFunctions.getExpenses(date);
  };

  const fetchIncomes = async (date) => {
    if (!date) date = getFormattedDate();
    return HomeFunctions.getIncomes(date);
  };

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <HomeContext.Provider
      value={{
        balance,
        refresh,
        balances,
        expenses,
        incomes,
        expensesByCategory,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => {
  return useContext(HomeContext);
};
