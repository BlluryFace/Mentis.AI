import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";

function Login() {
    const navigate = useNavigate();
    return (
        <div >
            <div className="box">
                <h2>Login</h2>
                <form>
                    <label className="label">Email</label>
                    <EmailInput/>
                    <label className="label">Password</label>
                    <PasswordInput />
                    <button type="submit" className="button">Login</button>
                </form>
                <p>
                    Don't have an account? <span onClick={() => navigate("/signup")} className="link">Sign Up</span>
                </p>
            </div>
        </div>
    );
}


export default Login;