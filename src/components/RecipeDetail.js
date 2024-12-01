import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/session', {
                    withCredentials: true,
                });
                setUser(response.data);
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    password: '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load user profile. Please log in again.');
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev);
        setSuccess('');
        setError('');
    };

    const handleUpdateUser = async () => {
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
            console.error('Error updating user info:', error);
            setError(
                error.response?.data?.message || 'Failed to update user information. Please try again later.'
            );
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
            sessionStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
            setError('Failed to log out. Please try again.');
        }
    };

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        marginRight: '10px',
                        cursor: 'pointer',
                    }}
                >
                    Logout
                </button>
                <button
                    onClick={handleEditToggle}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>
            <div>
                <h2>Welcome, {user.username}</h2>
                {isEditing ? (
                    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                        {error && (
                            <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
                        )}
                        {success && (
                            <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>
                        )}
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '8px' }}
                            />
                        </div>
                        <button
                            onClick={handleUpdateUser}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <h3>Favorites:</h3>
                        {user.favorites && user.favorites.length > 0 ? (
                            <ul>
                                {user.favorites.map((recipe) => (
                                    <li key={recipe.id}>
                                        <strong>{recipe.title}</strong>
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
