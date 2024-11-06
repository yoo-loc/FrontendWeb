// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/profile" replace /> : <Login />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} />
                <Route path="/home" element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
