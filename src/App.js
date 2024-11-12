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
import SignUp from './components/SignUp'; 
import Logout from './components/Logout';
import Profile from './components/Profile';
import { getUserData } from './services/dataService';

function App() {
    // Retrieve user data dynamically from dataService or similar
    const user = getUserData();
    const userId = user ? user.user_id : null;

    return (
        <Router> {/* Ensures all components are wrapped in Router */}
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
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} /> 
                <Route path="/profile" element={<Profile />} /> 
            </Routes>
        </Router>
    );
}

export default App;
