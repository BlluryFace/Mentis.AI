//This is gonna be the first page that the user sees
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to My App</h1>
      <Link to="/login" style={styles.button}>Login</Link>
      <Link to="/signup" style={styles.button}>Signup</Link>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "100px" },
  button: {
    display: "inline-block",
    padding: "12px 20px",
    margin: "10px",
    textDecoration: "none",
    backgroundColor: "black",
    color: "white",
    borderRadius: "6px",
    fontSize: "18px",
  },
};

export default Home;
