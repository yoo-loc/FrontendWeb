import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

import FavoriteRecipes from './components/FavoriteRecipes';

function App() {
    // Here you could use a state or context to get the logged-in user's ID
    const userId = 1; // Replace with actual logged-in user's ID

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} /> {/* Home route */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={<FavoriteRecipes userId={userId} />} /> {/* Favorites route */}
            </Routes>
        </Router>
    );
}

export default App;
