import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import your login CSS

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const handleLogin = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users"));
    console.log(storedUsers, "users");

    if (!storedUsers || !Array.isArray(storedUsers)) {
      setMessage("User not found. Please register first.");
      return;
    }
    const matchedUser = storedUsers.find(
      (user) =>
        (emailOrPhone === user.email || emailOrPhone === user.phone) &&
        password === user.password
    );

    if (matchedUser) {
      const token = "myGeneratedToken";
      localStorage.setItem("token", token);

      localStorage.setItem("userDetails", JSON.stringify(matchedUser));
      history("/bus-app");
    } else {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header1">Welcome to Bus App</h1>
      <h2 className="login-header">Login</h2>
      <div className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {message}
      </p>
      <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
