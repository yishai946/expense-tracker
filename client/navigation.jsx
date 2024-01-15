import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./screens/Home";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
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
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="home"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
