import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import DiscoverRecipes from './components/DiscoverRecipes';
import ShareRecipes from './components/ShareRecipes';
import CookTogether from './components/CookTogether';
import UserFeed from './components/UserFeed';
import SignUp from './components/SignUp';
import Logout from './components/Logout';
import 'bootstrap/dist/css/bootstrap.min.css';
import FavoriteRecipes from './components/FavoriteRecipes';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user'); // Change from localStorage to sessionStorage
        
        // Log session information
        if (storedUser) {
            console.log('Session Found:', JSON.parse(storedUser));
            setIsAuthenticated(true);
        } else {
            console.log('No session found');
        }
        setLoading(false); // Ensure loading state ends
    }, []);

    const logoutHandler = () => {
        console.log('Logging out and clearing session info');
        localStorage.removeItem('user'); // Clear persisted user data
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking auth
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Home />} />

                {/* Login Route */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
                <Route path="/userFeed" element={isAuthenticated ? <UserFeed /> : <Navigate to="/login" replace />} />
                <Route path="/recipes" element={isAuthenticated ? <RecipeList /> : <Navigate to="/login" replace />} />
                <Route path="/add-recipe" element={isAuthenticated ? <RecipeForm /> : <Navigate to="/login" replace />} />
                <Route path="/discover" element={isAuthenticated ? <DiscoverRecipes /> : <Navigate to="/login" replace />} />
                <Route path="/share" element={isAuthenticated ? <ShareRecipes /> : <Navigate to="/login" replace />} />
                <Route path="/cook-together" element={isAuthenticated ? <CookTogether /> : <Navigate to="/login" replace />} />
                <Route path="/favoriteRecipes" element={isAuthenticated ? <FavoriteRecipes /> : <Navigate to="/login" replace />} />
    
                {/* SignUp Route */}
                <Route path="/signup" element={<SignUp />} />

                {/* Logout Route */}
                <Route path="/logout" element={isAuthenticated ? <Logout onLogout={logoutHandler} /> : <Navigate to="/login" replace />} />

                {/* Fallback for undefined routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
