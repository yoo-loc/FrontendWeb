import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout, isAuthenticated }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

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
                        {/* Links for Fully Worked Routes */}
                        <Link to="/dashboard" className="dropdown-link">Dashboard</Link>
                        <Link to="/userFeed" className="dropdown-link">Feed</Link>
                        <Link to="/favoriteRecipes" className="dropdown-link">Favorite Recipes</Link>
                        <Link to="/recipes" className="dropdown-link">Recipes</Link>
                        <Link to="/add-recipe" className="dropdown-link">Add Recipe</Link>

                        {/* Divider */}
                        <div className="dropdown-divider"></div>

                        {/* Unworked or Placeholder Links */}
                        <div className="dropdown-unworked">
                            <Link to="/profile" className="dropdown-link">Profile</Link>
                            <Link to="/discover" className="dropdown-link">Discover Recipes</Link>
                            <Link to="/share" className="dropdown-link">Share Recipes</Link>
                            <Link to="/cook-together" className="dropdown-link">Cook Together</Link>
                            <Link to="/logout" className="dropdown-link">Logout</Link>
                            <Link to="/signup" className="dropdown-link">Sign Up</Link>
                            <Link to="/login" className="dropdown-link">Login</Link>
                        </div>
                    </div>
                )}
            </div>

            {isAuthenticated && (
                <button onClick={onLogout} className="logout-button">Logout</button>
            )}
        </nav>
    );
};

export default Navbar;
