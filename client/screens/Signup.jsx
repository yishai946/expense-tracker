import "../styles/Signup.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const baseUrl =
  "https://ir4ovq5ajyh2755u2jnjgj7oqi0bubsp.lambda-url.eu-north-1.on.aws/";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // [1 ]
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if all fields are filled
    if (!name || !username || !email || !password || !repeatPassword) {
      alert("Please fill all fields");
      return;
    }

    // check if password and repeat password are same
    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return;
    }

    // check if password is at least 8 characters long
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    // fetch request to create user
    try {
      const result = await fetch(`${baseUrl}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (!result.ok) {
        // Check for specific error messages from the server
        const errorData = await result.json();
        alert(`Error: ${errorData.error || "Something went wrong"}`);
        return;
      }

      alert("User created successfully");
      // clear form
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (err) {
      console.error(err);
      alert("Error creating user", err.message || err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Sign Up </p>
        <p className="message">Sign up now and get full access to our app. </p>
        <input
          required
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <input
          required
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // [2 ]
          className="input"
        />

        <input
          required
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />

        <input
          required
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <input
          required
          placeholder="Repeat Password"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="input"
        />

        <button className="submit">Sign Up</button>
        <p className="signin">
          Already have an acount ? <Link to="/signin">Sign in</Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Signup;
