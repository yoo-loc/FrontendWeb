import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated }) => {
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
                        {/* Public Links */}
                        <Link to="/" className="dropdown-link">Home</Link>
                        <Link to="/signup" className="dropdown-link">Signup</Link>
                        <Link to="/login" className="dropdown-link">Login</Link>

                        {/* Authenticated-Only Links */}
                        {isAuthenticated && (
                            <>
                                <Link to="/dashboard" className="dropdown-link">Dashboard</Link>
                                <Link to="/FavoriteRecipes" className="dropdown-link">Favorite Recipes</Link>
                                <Link to="/recipes" className="dropdown-link">Recipes</Link>
                                <Link to="/add-recipe" className="dropdown-link">Add Recipe</Link>
                                <Link to="/discover" className="dropdown-link">Discover Recipes</Link>
                                <Link to="/share" className="dropdown-link">Share Recipes</Link>
                                <Link to="/cook-together" className="dropdown-link">Cook Together</Link>
                                <Link to="/profile" className="dropdown-link">Profile</Link>
                                
                            </>
                        )}

                        {/* Logout Link */}
                        <div className="dropdown-divider"></div>
                        <Link
                            to="/logout"
                            className="dropdown-link"
                            onClick={() => setDropdownOpen(false)}
                        >
                            Logout
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
