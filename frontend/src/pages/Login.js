import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Styles";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";

function Login() {
  const navigate = useNavigate();
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };
  */
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>Login</h2>
        <form>
          <label style={styles.label}>Email</label>
          <EmailInput/>
          <label style={styles.label}>Password</label>
          <PasswordInput />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p>
          Don't have an account? <span onClick={() => navigate("/signup")} style={styles.link}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
