

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        sessionStorage.setItem('user', JSON.stringify(userData)); // Persist user in sessionStorage
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.clear(); // Clear all session data
        setUser(null); // Reset user state
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easier access to AuthContext
export const useAuthContext = () => useContext(AuthContext);
