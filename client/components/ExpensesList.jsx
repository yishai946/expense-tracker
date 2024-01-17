import React from "react";
import Expense from "./Expense";
import { useAppContext } from "../AppContext";

function ExpensesList() {
  const { expenses, currentCategory } = useAppContext();
  return (
    <div>
      <section className="expenses">
        {expenses
          .filter(
            (expense) =>
              expense.category === currentCategory || currentCategory === "All"
          )
          .map((expense, i) => (
            <Expense
              name={expense.name}
              price={expense.amount}
              date={expense.date}
              time={expense.time}
              category={expense.category}
              key={i}
            />
          ))}
      </section>
    </div>
  );
}

export default ExpensesList;
