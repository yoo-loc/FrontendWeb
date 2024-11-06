// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/user", { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(error => console.error("Error fetching user data", error));
    }, []);

    if (!user) {
        return <div>Loading...</div>;
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
