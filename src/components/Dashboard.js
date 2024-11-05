// src/components/Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Example check if user is logged in; adjust based on your app's logic
        const isLoggedIn = true; // Replace with actual authentication check
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to Your Dashboard!</h1>
            {/* Add more dashboard content here */}
        </div>
    );
};

export default Dashboard;
