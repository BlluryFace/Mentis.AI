import React, { useState } from "react";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import styles from "../Styles";

function PasswordInput({ value, onChange, placeholder = "Enter your Password" }) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        style={styles.input}
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
      />
      <div onClick={() => setVisible(!visible)} >
        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined/>}
      </div>
    </div>
    
  );
}

export default PasswordInput;