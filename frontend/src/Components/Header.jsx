import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";


const Header = () => {
  return (
    <header className="header">
      <div className="headerContent">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home </Link>
        </div>
        <div>
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/signup" className="nav-button">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};


export default Header;
