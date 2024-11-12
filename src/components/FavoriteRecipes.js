import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavoritesByUserId, removeFavorite, getRecipeById, getUserData, isLoggedIn } from '../services/dataService';

const FavoriteRecipes = () => {
    const [favorites, setFavorites] = useState([]);
    const [recipes, setRecipes] = useState([]); // Store full recipe details
    const [username, setUsername] = useState(""); // Store user's name
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Check if the user is logged in, if not, redirect to login
    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login"); // Redirect to login page if not logged in
        } else {
            const user = getUserData();
            if (user) {
                setUsername(user.name);

                // Fetch user's favorites
                const fetchFavorites = async (userId) => {
                    try {
                        const favoritesData = await getFavoritesByUserId(userId);
                        setFavorites(favoritesData);
                        fetchFavoriteRecipes(favoritesData); // Fetch detailed recipe data for favorites
                    } catch {
                        setError("Failed to fetch favorites.");
                    }
                };

                fetchFavorites(user.user_id);
            }
        }
    }, [navigate]);

    // Function to fetch full recipe details for each favorite
    const fetchFavoriteRecipes = (favorites) => {
        Promise.all(favorites.map((fav) => getRecipeById(fav.recipe_id)))
            .then((fullRecipes) => setRecipes(fullRecipes.filter((recipe) => recipe !== null)));
    };

    // Function to remove a recipe from favorites
    const handleRemoveFavorite = (recipe_id) => {
        const user = getUserData();
        if (user) {
            removeFavorite(user.user_id, recipe_id).then(() => {
                const updatedFavorites = favorites.filter((fav) => fav.recipe_id !== recipe_id);
                setFavorites(updatedFavorites);
                setRecipes(recipes.filter((recipe) => recipe.recipe_id !== recipe_id));
            });
        }
    };

    return (
        <div>
            {isLoggedIn() ? (
                <>
                    <h3>{username}'s Favorite Recipes</h3>
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.recipe_id}>
                                <h4>{recipe.name}</h4>
                                <p>Category: {recipe.category}</p>
                                <p>{recipe.description}</p>
                                <p>Favorites: {recipe.favorites_count}</p>
                                <button onClick={() => handleRemoveFavorite(recipe.recipe_id)}>Remove from Favorites</button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Please log in to view your favorite recipes.</p>
            )}
        </div>
    );
};

export default FavoriteRecipes;
