import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import axios from 'axios';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkIfAuthenticated = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/status', { withCredentials: true });
            setIsAuthenticated(response.data.isAuthenticated);
        } catch (error) {
            console.error('Error checking authentication status', error);
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
                <Route path="/" element={<Home />} />
                <Route path="/home" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" replace /> : <Login />} />
            </Routes>
        </Router>
    );
};

export default App;

