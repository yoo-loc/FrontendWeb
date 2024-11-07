import React, { useState } from 'react';
import { Link, } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
                        <Link to="/favorites" className="dropdown-link">Favorites</Link>
                        <Link to="/recipes" className="dropdown-link">Recipes</Link>
                        <Link to="/add-recipe" className="dropdown-link">Add Recipe</Link>
                           
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
