import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext'; // Updated import

const Logout = () => {
    const { logout } = useAuthContext(); // Access logout function from AuthContext
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/auth/logout', {
                    method: 'POST',
                    credentials: 'include', // Include cookies for session management
                });

                if (response.ok) {
                    logout(); // Clear context and session storage
                    navigate('/login'); // Redirect to login page
                } else {
                    console.error('Logout failed:', response.status);
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logoutUser();
    }, [logout, navigate]);

    return (
        <div className="logout-page">
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
