// src/components/Login.js
import React from 'react';
import './Login.css';

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = "https://project3-30a71.web.app/oauth2/authorization/google";
    };

    return (
        <div className="login-page">
            <h2>Log in to Your Account</h2>
            <div className="login-buttons">
                <button onClick={handleGoogleLogin}>Continue with Google</button>
        
            </div>
            <div className="separator">or</div>
            <form className="form">
                <input type="text" placeholder="Username or email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Log in</button>
            </form>
            <p className="signup-text">Don't have an account? <a href="/signup">Sign up.</a></p>
        </div>
    );
};

export default Login;
