// src/components/SignUp.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/dataService';
 // Optional: Extract styles to a CSS file for reuse

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            await signUp(username, password, email, name);
            setError(null);
            alert("Sign-up successful! Redirecting to login...");
            navigate("/login"); // Redirect after confirmation
        } catch (err) {
            setError(err.message || "An unexpected error occurred."); // More specific error handling
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    Username:
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
