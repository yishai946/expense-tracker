import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Expenses from "./screens/Expenses";
import Home from "./screens/Home";
import Incomes from "./screens/Incomes";
import Settings from "./screens/Settings";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Verify from "./screens/Verify";
import NoPage from "./screens/noPage";

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
        <Route path="verify-email" element={<Verify />} />
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
        <Route
          path="settings"
          element={isAuthenticated ? <Settings /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
