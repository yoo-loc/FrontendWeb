import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user info from the backend
        fetch("https://project3-30a71.web.app/user", { credentials: "include" })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error("Error fetching user data:", error));
    }, []);

    if (!user) return <p>Loading user data...</p>;

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <img src={user.picture} alt="Profile" />
        </div>
    );
};

export default Profile;