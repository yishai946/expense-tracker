import { createContext, useEffect, useState, useContext } from "react";
import HomeFunctions from "../functions/Home";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [balance, setBalance] = useState(0);
  const [balances, setBalances] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        await fetchBalance();
        await fetchBalances();
        await fetchExpenses();
        await fetchIncomes();
      })();
    }
  }, []);

  const fetchBalance = async (date) => {
    if (!date) date = getFormattedDate();
    const response = await HomeFunctions.getBalance(date);
    setBalance(response.balance);
  };

  const fetchBalances = async (date) => {
    if (!date) date = getFormattedDate();
    const response = await HomeFunctions.getBalances(date);
    setBalances(response.balances);
  };

  const fetchExpenses = async (date) => {
    if (!date) date = getFormattedDate();
    const response = await HomeFunctions.getExpenses(date);
    setExpenses(response.expenses);
  };

  const fetchIncomes = async (date) => {
    if (!date) date = getFormattedDate();
    const response = await HomeFunctions.getIncomes(date);
    setIncomes(response.incomes);
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
      value={{ balance, fetchBalance, balances, expenses, incomes }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeContext = () => {
  return useContext(HomeContext);
};
