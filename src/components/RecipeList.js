import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(''); // Add state for error messages

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const storedUser = JSON.parse(sessionStorage.getItem('user'));
                if (!storedUser) {
                    console.error('User is not authenticated.');
                    setError('You need to log in to view recipes.');
                    return;
                }

                const response = await axios.get('http://localhost:8080/recipes/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedUser.token}` // Example for token
                    },
                    withCredentials: true, // Include cookies for session-based authentication
                });
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Failed to fetch recipes. Please try again later.');
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
            setError('Failed to delete the recipe. Please try again.');
        }
    };

    const handleAddToFavorites = async (recipeId) => {
        try {
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            if (!storedUser) {
                console.error('User is not authenticated.');
                setError('You need to log in to add favorites.');
                return;
            }

            await axios.post(`http://localhost:8080/recipes/favorites/${storedUser.id}`, recipeId, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert('Recipe added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            setError('Failed to add the recipe to favorites. Please try again.');
        }
    };

    return (
        <div className="recipe-list-container">
            <h1 className="recipe-list-title">Recipes</h1>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
                            <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="view-recipe-link">
                                View Full Recipe
                            </a>
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
