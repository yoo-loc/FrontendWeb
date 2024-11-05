// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../services/authService';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = isLoggedIn(); // Check authentication status

    // Handle logout
    const handleLogout = () => {
        logout(); // Clears the session
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="navbar">
            <div className="logo">Recipe Sharing App</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                
                {isAuthenticated ? (
                    <>
                        <li><Link to="/favorites">Favorites</Link></li> {/* New Favorites link */}
                        <li><Link to="/profile">Profile</Link></li>
                        <li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
