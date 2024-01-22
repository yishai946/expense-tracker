import React from "react";
import ReactDOM from "react-dom/client";
import App from "./navigation";
import { ExpensesProvider } from "./context/ExpensesContext";
import { IncomesProvider } from "./context/IncomesContext";
import { HomeProvider } from "./context/HomeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExpensesProvider>
      <IncomesProvider>
        <HomeProvider>
          <App />
        </HomeProvider>
      </IncomesProvider>
    </ExpensesProvider>
  </React.StrictMode>
);
