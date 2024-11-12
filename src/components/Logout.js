// src/components/Logout.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/dataService';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Log out the user on component mount
        logout();
        // Redirect to the login page after a short delay
        setTimeout(() => {
            navigate('/login');
        }, 1500); // 1.5-second delay for user feedback
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>You have been logged out.</h2>
            <p>Redirecting to login...</p>
        </div>
    );
};

export default Logout;
