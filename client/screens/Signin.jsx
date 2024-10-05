import "../styles/Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = "https://5c6prkkgx4.execute-api.eu-north-1.amazonaws.com/prod";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // fetch login api
    try {
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 400) {
        response.json().then((data) => {
          alert(data.error);
          console.error(data);
        });
        return;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiry", data.expiry);
        localStorage.setItem("userId", data.userId);

        // redirect to home page
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Sign In </p>
        <p className="message">Sign in now and enjoy!</p>

        <input
          required=""
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />

        <input
          required=""
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
