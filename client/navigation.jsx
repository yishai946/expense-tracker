import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Expenses from "./screens/Expenses";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import NoPage from "./screens/noPage";
import Home from "./screens/Home";
import Incomes from "./screens/Incomes";

const App = () => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" index element={<Home />} />
        ) : (
          <Route index path="/" element={<Signin />} />
        )}
        <Route
          path="signin"
          element={isAuthenticated ? <Home /> : <Signin />}
        />
        <Route
          path="signup"
          element={isAuthenticated ? <Home /> : <Signup />}
        />
        <Route
          path="home"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="expenses"
          element={isAuthenticated ? <Expenses /> : <Navigate to="/signin" />}
        />
        <Route
          path="incomes"
          element={isAuthenticated ? <Incomes /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
