import React from 'react';
import { useAuthContext } from './AuthContext'; // Updated to use the custom hook
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
import FavoriteRecipes from './components/FavoriteRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const { user } = useAuthContext(); // Use custom hook for context access

    const isAuthenticated = !!user; // Boolean to check if user exists

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
                <Route path="/logout" element={isAuthenticated ? <Logout /> : <Navigate to="/login" replace />} />

                {/* Fallback for undefined routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
