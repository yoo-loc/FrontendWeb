// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/dataService';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Function to handle login using authService
    const handleLogin = (e) => {
        e.preventDefault();
        
        // Use the login function from authService
        const result = login(username, password);
        
        if (result.success) {
            console.log("Login successful:", result.userData);
            navigate("/dashboard"); // Redirect after successful login
        } else {
            setError(result.message); // Display error message
        }
    };

    return (
        <div className="login-page">
            <h2>Log in to Your Account</h2>
            <form className="form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Log in</button>
            </form>
            <p className="signup-text">
                Don't have an account? <a href="/signup">Sign up.</a>
            </p>
        </div>
    );
};

export default Login;
