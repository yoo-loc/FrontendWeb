// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import FavoriteRecipes from './components/FavoriteRecipes';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import AddRecipe from './components/AddRecipe';

function App() {
    const userId = 1; // Replace with actual logged-in user's ID

    return (
        <Router> {/* Ensure Router wraps all components */}
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={<FavoriteRecipes userId={userId} />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
                <Route path="/add-recipe" element={<AddRecipe />} />
            </Routes>
        </Router>
    );
}

export default App;
