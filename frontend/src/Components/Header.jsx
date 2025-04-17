import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Header = () => {
  return (
    <header className="header">
      <div className="headerContent">
        {/* Left-aligned navigation links */}
        <div className="nav-links">
          {/* If the user already log in then the home page should have the name of user or profile
          instead of showing home and login button */}
          <Link to="/home" className="nav-link">Home </Link>

          {/* Jump to the feature section but if we dont have much thing on the homepage, we can delete that*/}
        </div>


        {/* Login and signup buttons */}
        <div className="auth-buttons">
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/signup" className="nav-button">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};


export default Header;
