import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/dataService';
import './Login.css';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData).then((response) => {
            if (response.status === 200) {
                navigate('/profile');
            }
        }).catch((error) => {
            console.error("Signup failed:", error);
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/api/auth/google";
    };

    return (
        <div className="login-page">
            <h2>Create an Account</h2>
            <div className="login-buttons">
                <button onClick={handleGoogleLogin}>Continue with Google</button>
            </div>
            <div className="separator">or</div>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username or email"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Sign up</button>
            </form>
            <p className="signup-text">Already have an account? <a href="/login">Log in here.</a></p>
        </div>
    );
};

export default Signup;