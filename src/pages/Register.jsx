import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Save user credentials in local storage
        localStorage.setItem("user", JSON.stringify({ username, password }));
        alert("Registration successful! Please login.");
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
        </div>
    );
};

export default Register;
