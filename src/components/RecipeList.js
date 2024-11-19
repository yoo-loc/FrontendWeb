import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/recipes/all');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/recipes/${id}`);
            // Remove the deleted recipe from the state
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };


    const handleAddToFavorites = async (recipeId) => {
        try {
            const userId = '673aac47856eaf52b2171837'; // Replace with dynamic user ID logic
            await axios.post(`http://localhost:8080/recipes/favorites/${userId}`, recipeId, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert('Recipe added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            alert('Failed to add to favorites.');
        }
    };

    return (
        <div className="recipe-list-container">
            <h1 className="recipe-list-title">Recipes</h1>
            {recipes.length > 0 ? (
                <div className="recipe-grid">
                    {recipes.map((recipe) => (
                        <div className="recipe-card" key={recipe.id}>
                            <h2>{recipe.title}</h2>
                            <img
                                src={recipe.imageUrl || 'https://via.placeholder.com/300x200'}
                                alt={recipe.title}
                                className="recipe-image"
                            />
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Dietary Tags:</strong> {recipe.dietaryTags}</p>
                          
                            <button onClick={() => handleDelete(recipe.id)} className="delete-button">
                                Delete
                            </button>
                            <button onClick={() => handleAddToFavorites(recipe.id)} className="favorite-button">
                            
                              Add to Favorites
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-recipes-message">No recipes found.</p>
            )}
        </div>
    );
};

export default RecipeList;

