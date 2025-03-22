import React from "react";
import styles from "../Styles";

function EmailInput({ value, onChange, placeholder = "Enter your email" }) {
  return (
    <div>
      <input
        type="email"
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EmailInput;
