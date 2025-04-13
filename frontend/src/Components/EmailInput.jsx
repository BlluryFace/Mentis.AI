import React from "react";
import "../styles/styles.css";

function EmailInput({ value, onChange, placeholder = "Enter your email" }) {
  return (
    <div>
      <input
        type="email"
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EmailInput;
