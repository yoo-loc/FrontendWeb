// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getUserData } from '../services/authService';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in using authService
        if (!isLoggedIn()) {
            navigate("/login"); // Redirect to login if not logged in
        } else {
            // Retrieve and set user data
            const userData = getUserData();
            setUser(userData);
        }
    }, [navigate]);

    if (!user) return null; // Prevents rendering until user data is available

    return (
        <div>
            <h1>Welcome to Your Dashboard, {user.name}!</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Add more personalized dashboard content here */}
        </div>
    );
};

export default Dashboard;
