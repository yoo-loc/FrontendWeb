import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Function to clear session data on logout
        const logoutUser = () => {
            // Clear sessionStorage and localStorage
            sessionStorage.clear();  // Clears all items in sessionStorage
            localStorage.clear();    // Clears all items in localStorage

            // Redirect to login page after logout
            navigate('/login');  // Or change to '/' if you want to redirect to home page
        };

        // Call the logout function
        logoutUser();
    }, [navigate]);

    return (
        <div className="logout-page">
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
