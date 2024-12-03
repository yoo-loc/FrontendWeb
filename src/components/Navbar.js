import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ isAuthenticated }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Public Links */}
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>

                        {/* Authenticated-Only Links */}
                        {isAuthenticated && (
                            <>
                                {/* <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link to="/FavoriteRecipes" className="nav-link">
                                        Favorite Recipes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/recipes" className="nav-link">
                                        Recipes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/add-recipe" className="nav-link">
                                        Add Recipe
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/discover" className="nav-link">
                                        Discover Recipes
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link to="/share" className="nav-link">
                                        Share Recipes
                                    </Link>
                                </li>


                                <li className="nav-item">
                                    <Link to="/RecipeForm" className="nav-link">
                                        Recipes Form
                                    </Link>
                                </li>


                                {/* <li className="nav-item">
                                    <Link to="/cook-together" className="nav-link">
                                        Cook Together
                                    </Link>
                                </li> */}
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                            </>
                        )}

                        {/* Logout Link */}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">
                                    Logout
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
