import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Add CSS for styling the profile page

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State to hold user data
    const [favorites, setFavorites] = useState([]); // State to hold detailed favorites
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Fetch user session data
                const response = await axios.get('http://localhost:8080/api/users/session', {
                    withCredentials: true, // Include session cookies for authentication
                });

                const userData = response.data;
                setUser(userData); // Set user data
                setFavorites(userData.favorites); // Set initial favorites list
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user profile. Please log in again.');
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
            sessionStorage.clear(); // Clear session storage
            navigate('/'); // Redirect to the homepage
        } catch (error) {
            console.error('Error logging out:', error);
            setError('Failed to log out. Please try again.');
        }
    };

    const refreshFavorites = async () => {
        try {
            // Re-fetch the updated session data for favorites
            const response = await axios.get('http://localhost:8080/api/users/session', {
                withCredentials: true,
            });
            setFavorites(response.data.favorites); // Update the favorites list
        } catch (error) {
            console.error('Error refreshing favorites:', error);
        }
    };

    if (error) {
        return (
            <div className="profile-container">
                <p>{error}</p>
                <button onClick={() => navigate('/login')} className="login-button">
                    Go to Login
                </button>
            </div>
        );
    }

    if (!user) {
        return <div className="profile-container">Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            <div className="profile-content">
                <h2>Welcome and Find Your Recipes, {user.username}</h2>
                <p>Email: {user.email}</p>
                <img
                    src="https://via.placeholder.com/150" // Placeholder profile image
                    alt="Profile"
                />
                <h3>Your Favorites:</h3>
                {favorites && favorites.length > 0 ? (
                    <ul>
                        {favorites.map((recipe) => (
                            <li key={recipe.id}>
                                <Link
                                    to={`/recipes/${recipe.id}/details`}
                                    className="recipe-link"
                                    onClick={refreshFavorites} // Refresh favorites list dynamically
                                >
                                    <strong>{recipe.title}</strong>
                                </Link>
                                <p>{recipe.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have no favorite recipes yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
