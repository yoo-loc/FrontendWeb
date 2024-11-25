import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Add CSS for styling the sidebar

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

   

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/logout', {}, {
                withCredentials: true
            });
            console.log(response.data.message);
            navigate('/'); // Use navigate instead of window.location.href for SPA behavior
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show while data is loading
    }

    if (!user) {
        return <div>Error: Unable to load user data.</div>; // Fallback if user data isn't available
    }

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            <div className="profile-content">
                <h2>Welcome and Find your Recipes, {user.name}</h2>
                <p>Email: {user.email}</p>
                <img src={user.picture} alt="Profile" />
            </div>
        </div>
    );
};

export default Profile;
