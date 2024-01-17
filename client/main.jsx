import React from "react";
import ReactDOM from "react-dom/client";
import App from "./navigation";
import { AppProvider } from "./AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
