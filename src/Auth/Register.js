import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // Import your register CSS

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }
    if (name === "" || name === undefined) {
      newErrors.name = "Name is required";
    }
    if (!name.length > 3) {
      newErrors.name = "Please enter name above 3 letters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }
    let regexmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === "" || email === undefined) {
      newErrors.email = "Email is required";
    } else if (!regexmail.test(String(email))) {
      console.log("email", email);
      newErrors.email = "Please enter a valid Email Id";
    }
    let regexPhone = /^[6-9]\d{9}$/;
    if (!phone) {
      newErrors.phone = "Phone number is required";
    }
    if (phone === "" || phone === undefined) {
      newErrors.phone = "Phone number is required";
    } else if (!regexPhone.test(phone)) {
      newErrors.phone = "Please enter a valid 10-digit Phone number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }
    if (password === "" || password === undefined) {
      newErrors.password = "Password is required";
    }
    if (!password.length > 6) {
      newErrors.password = "Password must be above 6 charaters";
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let finduser = users.find((x) => x.email === email || x.phone === phone);

    if (finduser) {
      if (finduser.email === email) newErrors.email = "Email detail was already taken";

      if (finduser.phone === phone) newErrors.phone="Phone Number detail was already taken";
    }

    return newErrors;
  };

  const handleRegister = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newUser = {
        name,
        phone,
        email,
        password,
      };

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      existingUsers.push(newUser);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      history("/login");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-header1">Welcome to Bus App</h1>
      <h2 className="register-header">Register</h2>
      <div className="register-form">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            maxLength="10"
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </div>

      <div className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
