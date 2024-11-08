import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Profile from './components/Profile';
import Login from './components/Login';
import DiscoverRecipes from './components/DiscoverRecipes'; // Add this component
import ShareRecipes from './components/ShareRecipes'; // Add this component
import CookTogether from './components/CookTogether'; // Add this component
import axios from 'axios';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkIfAuthenticated = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/auth/status', { withCredentials: true });
                setIsAuthenticated(response.data.isAuthenticated);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkIfAuthenticated();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/add-recipe" element={<RecipeForm />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                {/* Protected Routes */}
                <Route path="/discover" element={isAuthenticated ? <DiscoverRecipes /> : <Navigate to="/login" replace />} />
                <Route path="/share" element={isAuthenticated ? <ShareRecipes /> : <Navigate to="/login" replace />} />
                <Route path="/cook-together" element={isAuthenticated ? <CookTogether /> : <Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
