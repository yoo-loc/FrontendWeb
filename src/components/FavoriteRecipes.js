import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteRecipes = () => {
    const [favorites, setFavorites] = useState([]);
    const userId = '673aac47856ea5f2b2171837'; // Use actual logged-in userId

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/recipes/favorites/${userId}`, {
                    withCredentials: true // Include cookies for authentication
                });
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorite recipes:', error);
            }
        };
        

        fetchFavorites();
    }, [userId]);

    return (
        <div>
            <h1>Your Favorite Recipes</h1>
            {favorites.length > 0 ? (
                favorites.map((recipe) => (
                    <div key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                    </div>
                ))
            ) : (
                <p>No favorites yet.</p>
            )}
        </div>
    );
};

export default FavoriteRecipes;
