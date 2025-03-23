import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Styles";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import GoogleLogo from "../assets/google_icon.png";

function Signup() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Sign Up</h2>
        <label style={styles.label}>Email</label>
        <EmailInput />
        <label style={styles.label}>Password</label>
        <PasswordInput />
        <button style={styles.button}>Sign Up</button>
        <p>
          Already have an account? <span onClick={() => navigate("/login")} style={styles.link}>Login</span>
        </p>
        <div style={styles.dividerContainer}>
          <div style={styles.line}></div>
          <span style={styles.orText}>OR</span>
          <div style={styles.line}></div>
        </div>
        <p></p>
        <button style={styles.googleButton}>
         <img src={GoogleLogo} alt="Google Logo" style={styles.googleIcon} />
         Sign Up with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
