import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from sessionStorage
        const storedUser = sessionStorage.getItem('user');
        
        if (storedUser) {
            // Parse the user data from sessionStorage if available
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>; // Display loading message if user data is not available yet
    }

    return (
        <div>
            <h1>Welcome to Your Dashboard, {user.name || user.username}!</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Add more personalized dashboard content here */}
        </div>
    );
};

export default Dashboard;
