import "../styles/Login.css";
import React from "react";
import { Link } from "react-router-dom";

function Signin() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // fetch login api
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target[0].value,
          password: e.target[1].value,
        }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiry", data.expiry);
        // redirect to home page
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Sign In </p>
        <p className="message">Sign in now and enjoy!</p>

        <input
          required=""
          placeholder="Username"
          type="text"
          className="input"
        />

        <input
          required=""
          placeholder="Password"
          type="password"
          className="input"
        />

        <button className="submit">Sign In</button>
        <p className="signin">
          Don't have an acount ? <Link to="/signup">Sign up</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Signin;
