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
                        <Link to="/dashboard" className="dropdown-link">Dashboard</Link>
                        <Link to="/userFeed" className="dropdown-link">Feed</Link>
                        <Link to="/FavoriteRecipes" className="dropdown-link">Favorite Recipes</Link>
                        <Link to="/recipes" className="dropdown-link">Recipes</Link>
                        <Link to="/add-recipe" className="dropdown-link">Add Recipe</Link>
                        <Link to="/logout" className="dropdown-link">Logout</Link>
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
