import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import RecipeList from './components/RecipeList'; // Import RecipeList
import RecipeForm from './components/RecipeForm'; // Import RecipeForm
import DiscoverRecipes from './components/DiscoverRecipes'; // Add this component
import ShareRecipes from './components/ShareRecipes'; // Correct import, keep only this one
import CookTogether from './components/CookTogether';
import axios from 'axios';
import UserFeed from './components/UserFeed'; // No duplicate imports
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkIfAuthenticated = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/status', { withCredentials: true });
            setIsAuthenticated(response.data.isAuthenticated);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkIfAuthenticated();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Home />} />

                {/* Recipe Routes */}
                <Route path="/recipes" element={isAuthenticated ? <RecipeList /> : <Navigate to="/login" replace />} />
                <Route path="/add-recipe" element={isAuthenticated ? <RecipeForm /> : <Navigate to="/login" replace />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />

                <Route path="/userFeed" element={isAuthenticated ? <UserFeed /> : <Navigate to="/userFeed" replace />} />
                <Route path="/share" element={isAuthenticated ? <ShareRecipes /> : <Navigate to="/login" replace />} />

                {/* Login Route */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" replace /> : <Login />} />

                {/* Signup Route */}
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/profile" replace /> : <Signup />} />

                {/* Protected Routes */}
                <Route path="/discover" element={isAuthenticated ? <DiscoverRecipes /> : <Navigate to="/login" replace />} />
                <Route path="/cook-together" element={isAuthenticated ? <CookTogether /> : <Navigate to="/login" replace />} />

                {/* Fallback for undefined routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
