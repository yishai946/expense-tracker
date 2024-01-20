import React from "react";
import ReactDOM from "react-dom/client";
import App from "./navigation";
import { ExpensesProvider } from "./context/ExpensesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExpensesProvider>
      <App />
    </ExpensesProvider>
  </React.StrictMode>
);
