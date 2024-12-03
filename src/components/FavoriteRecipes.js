import React, { useEffect, useState } from 'react';
import { getFavoritesByUserId, addFavorite, removeFavorite,getRecipeById  } from '../services/dataService';


const FavoriteRecipes = ({ userId, recipeId }) => {
    const [favorites, setFavorites] = useState([]);
    const [recipes, setRecipes] = useState([]); // Store full recipe details
    const [error, setError] = useState("");

    // Fetch the user's favorite recipes on component mount
    useEffect(() => {
        getFavoritesByUserId(userId).then((data) => {
            setFavorites(data);
            fetchFavoriteRecipes(data);
        });
    }, [userId]);

    // Fetch full recipe details for each favorite
    const fetchFavoriteRecipes = (favorites) => {
        Promise.all(favorites.map((fav) => getRecipeById(fav.recipe_id)))
            .then((fullRecipes) => setRecipes(fullRecipes.filter((recipe) => recipe !== null)));
    };

    // Function to add a recipe to favorites
    const handleAddFavorite = () => {
        addFavorite(userId, recipeId)
            .then((newFavorite) => {
                setFavorites([...favorites, newFavorite]);
                setError(""); // Clear any previous error
                fetchFavoriteRecipes([...favorites, newFavorite]); // Fetch details for new favorite
            })
            .catch((err) => setError(err)); // Display error if recipe is already favorited
    };

    // Function to remove a recipe from favorites
    const handleRemoveFavorite = (recipe_id) => {
        removeFavorite(userId, recipe_id).then(() => {
            const updatedFavorites = favorites.filter((fav) => fav.recipe_id !== recipe_id);
            setFavorites(updatedFavorites);
            setRecipes(recipes.filter((recipe) => recipe.recipe_id !== recipe_id));
        });
    };

    return (
        <div>
            <h3>Favorite Recipes</h3>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.recipe_id}>
                        <h4>{recipe.name}</h4>
                        <p>Type: {recipe.type}</p>
                        <p>{recipe.description}</p>
                        <p>Favorites: {recipe.favorites_count}</p>
                        <button onClick={() => handleRemoveFavorite(recipe.recipe_id)}>Remove from Favorites</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddFavorite}>Add Recipe to Favorites</button>
        </div>
    );
};

export default FavoriteRecipes;