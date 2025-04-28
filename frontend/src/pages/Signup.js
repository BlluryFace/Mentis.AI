import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";  // Import the external CSS file
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import GoogleButton from 'react-google-button'

function Signup() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="box">
                <h2>Sign Up</h2>
                <label className="label">Email</label>
                <EmailInput />
                <label className="label">Password</label>
                <PasswordInput />
                <button className="button">Sign Up</button>
                <p>
                    Already have an account? <span onClick={() => navigate("/login")} className="link">Login</span>
                </p>
                <div className="dividerContainer">
                    <div className="line"></div>
                    <span className="orText">OR</span>
                    <div className="line"></div>
                </div>
                <p></p>
                <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                    <GoogleButton/>
                </div>

            </div>
        </div>
    );
}

export default Signup;