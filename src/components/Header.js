import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // Import your Header CSS

function Header() {
  const history = useNavigate();
  
  const handleLogout = () => {
    // Clear token from local storage on logout
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    history("/login");
  };

  const handleNavigateHome = () => {
    history("/bus-app");
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title" onClick={handleNavigateHome}>
          BUSAPP
        </h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/bus-app">Home</Link>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
