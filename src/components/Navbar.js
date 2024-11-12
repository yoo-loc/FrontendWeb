// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-link navbar-home">Home</Link>
            
            

            <div className="navbar-menu">
                <button onClick={toggleDropdown} className="navbar-button">
                    Menu
                </button>

                {isDropdownOpen && (
                    <div className="dropdown">
                        <Link to="/dashboard" className="dropdown-link">Dashboard</Link>
                        <Link to="/profile" className="dropdown-link">Profile</Link> 
                       
                        <Link to="/recipes" className="dropdown-link">Recipes</Link>
                        <Link to="/add-recipe" className="dropdown-link">Add Recipe</Link>
                        <Link to="/signup" className="dropdown-link">Sign Up</Link> 
                        <Link to="/logout" className="dropdown-link">Log out</Link> 
                   
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
