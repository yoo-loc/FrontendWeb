import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/user", { withCredentials: true })
            .then(response => {
                setUser(response.data);
                setError(null); // Clear error if successful
            })
            .catch(error => {
                console.error("Error fetching user data", error);
                setError("Failed to load user data. Please try again.");
            })
            .finally(() => {
                setIsLoading(false); // Stop loading spinner
            });
    }, []);

    if (isLoading) {
        return <div>Welcome People</div>;
    }

    if (error) {
        return <div>{error}</div>; // Show error message in UI
    }

    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <img src={user.picture} alt="Profile" />
        </div>
    );
};

export default Profile;
