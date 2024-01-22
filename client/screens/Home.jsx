import React from "react";
import LogoutButton from "../components/LogoutButton";
import Navigator from "../components/Navigator";
import Balance from "../components/Balance";
import LineChart from "../components/LineChart";
import { useHomeContext } from "../context/HomeContext";
import "../styles/Home.css";

function Home() {
  const { balances, expenses, incomes } = useHomeContext();

  return (
    <div>
      <h1>Finance Tracker</h1>
      <LogoutButton />
      <Navigator />
      <Balance />
      {balances && expenses && incomes && (
        <LineChart balances={balances} expenses={expenses} incomes={incomes} />
      )}
    </div>
  );
}

export default Home;
