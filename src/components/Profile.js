import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css'; // Add CSS for styling the profile page

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State to hold user data
    const [favorites, setFavorites] = useState([]); // State to hold detailed favorites
    const [isEditing, setIsEditing] = useState(false); // State for editing mode
    const [formData, setFormData] = useState({ username: '', email: '', password: '' }); // Form data for editing
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
                setFormData({
                    username: userData.username,
                    email: userData.email,
                    password: '',
                }); // Initialize form data
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

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
        setError('');
        setSuccess('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/users/${user.id}/update-info`,
                formData,
                { withCredentials: true }
            );
            setSuccess(response.data.message);
            setUser((prev) => ({
                ...prev,
                username: formData.username,
                email: formData.email,
            }));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
            setError(
                error.response?.data?.message || 'Failed to update profile. Please try again later.'
            );
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
                <button onClick={handleEditToggle} className="edit-button">
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
            <div className="profile-content">
                <h2>Welcome, {user.username}</h2>
                {isEditing ? (
                    <div className="edit-profile-form">
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button onClick={handleUpdateProfile} className="save-button">
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div className="profile-info">
                        <p><strong>Email:</strong> {user.email}</p>
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
                )}
            </div>
        </div>
    );
};

export default Profile;
