// src/components/Login.js
import React from 'react';
import './Login.css';


const Login = () => {
    const googleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div>
            <button onClick={googleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;


