import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Add CSS for styling the sidebar

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('User logged out');
        navigate('/'); // Navigate back to the homepage
    };

    const dummyUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        picture: 'https://via.placeholder.com/150', // Placeholder profile image
    };

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            <div className="profile-content">
                <h2>Welcome and Find your Recipes, {dummyUser.name}</h2>
                <p>Email: {dummyUser.email}</p>
                <img src={dummyUser.picture} alt="Profile" />
            </div>
        </div>
    );
};

export default Profile;
