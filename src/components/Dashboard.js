import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getUserData, getAllRecipes } from '../services/dataService';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [topRecipes, setTopRecipes] = useState([]); // State to hold top recipes

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login"); // Redirect to login if not logged in
        } else {
            const userData = getUserData();
            setUser(userData);
            fetchTopRecipes(); // Fetch top recipes when the user is logged in
        }
    }, [navigate]);

    // Function to fetch and set top recipes
    const fetchTopRecipes = async () => {
        const recipes = await getAllRecipes();
        const sortedRecipes = recipes.sort((a, b) => b.favorites_count - a.favorites_count); // Sort recipes by favorites
        setTopRecipes(sortedRecipes.slice(0, 5)); // Limit to top 5 recipes
    };

    if (!user) return null; // Prevents rendering until user data is available

    return (
        <div>
            <h1>Welcome to Your Dashboard, {user.name}!</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>

            {user.username === "a" && (
                <div>
                    <p>This is content specifically for user "a".</p>
                    {/* Add more user "a" specific content here */}
                </div>
            )}

            {user.username === "b" && (
                <div>
                    <p>This is content specifically for user "b".</p>
                    {/* Add more user "b" specific content here */}
                </div>
            )}

            {/* Top Recipes Section */}
            <div>
                <h2>Top Recipes</h2>
                {topRecipes.length > 0 ? (
                    <ul>
                        {topRecipes.map((recipe) => (
                            <li key={recipe.recipe_id}>
                                <h4>{recipe.name}</h4>
                                <p>Category: {recipe.category}</p>
                                <p>{recipe.description}</p>
                                <p>Favorites: {recipe.favorites_count}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No top recipes available.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
