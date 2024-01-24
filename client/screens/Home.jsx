import React from "react";
import LogoutButton from "../components/LogoutButton";
import Navigator from "../components/Navigator";
import LineChart from "../components/LineChart";
import PiChart from "../components/PiChart";
import { useHomeContext } from "../context/HomeContext";
import "../styles/Home.css";

function Home() {
  const { balance, expensesTotal, incomesTotal, percentage } = useHomeContext();

  return (
    <div>
      <h1>Finance Tracker</h1>
      <LogoutButton />
      <Navigator />
      <div className="data">
        <PiChart />
        <div className="headers">
          <label style={{ color: "rgb(53, 162, 235)" }}>Balance:</label>
          <p className="balance">{balance}₪</p>
          <label style={{ color: "rgb(75, 192, 192)" }}>Incomes:</label>
          <p className="income">{incomesTotal}₪</p>
          <label style={{ color: "rgb(255, 99, 132)" }}>Expenses:</label>
          <p className="expense">{expensesTotal}₪</p>
        </div>
      </div>
      <h1>
        You are spending more than {parseInt(percentage)}% of other users.
        <br />
        <span style={{ color: "royalBlue" }}>
          {percentage > 50
            ? " Keep it up!"
            : " Keep it fun and manage wisely!"}
        </span>
      </h1>

      <LineChart />
    </div>
  );
}

export default Home;
