// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const isAuthenticated = false; // Replace with actual authentication logic

    return (
        <nav>
            <div className="logo">Recipe Sharing App</div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipes">Recipes</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
