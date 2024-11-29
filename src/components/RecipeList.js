import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const storedUser = JSON.parse(sessionStorage.getItem('user'));
                if (!storedUser) {
                    console.error('User is not authenticated.');
                    setError('You need to log in to view recipes.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:8080/recipes/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedUser.token}`,
                    },
                    withCredentials: true,
                });

                setRecipes(response.data);
                setFilteredRecipes(response.data); // Initialize filtered recipes
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Failed to fetch recipes. Please try again later.');
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchRecipes();
    }, []);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = recipes.filter((recipe) => {
            const titleMatch = recipe.title.toLowerCase().includes(query);
            const tagsMatch = Array.isArray(recipe.dietaryTags)
                ? recipe.dietaryTags.some((tag) => tag.toLowerCase().includes(query))
                : recipe.dietaryTags?.toLowerCase().includes(query);
            return titleMatch || tagsMatch;
        });
        setFilteredRecipes(filtered);
    };

    const handleDelete = async (id) => {
        try {
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            await axios.delete(`http://localhost:8080/recipes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedUser.token}`,
                },
            });

            setRecipes(recipes.filter((recipe) => recipe.id !== id));
            setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== id));
            alert('Recipe deleted successfully!');
        } catch (error) {
            console.error('Error deleting recipe:', error);
            setError('Failed to delete the recipe. Please try again.');
        }
    };

    const handleAddToFavorites = async (recipeId) => {
        try {
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            if (!storedUser) {
                setError('You need to log in to add favorites.');
                return;
            }

            await axios.post(`http://localhost:8080/recipes/favorites/${storedUser.id}`, recipeId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedUser.token}`,
                },
            });

            alert('Recipe added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            setError('Failed to add the recipe to favorites. Please try again.');
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/recipes/${id}/details`); // Navigate to RecipeDetail page
    };

    if (loading) {
        return <div className="loading-message">Loading recipes...</div>; // Display loading message
    }

    if (error) {
        return <div className="error-message">{error}</div>; // Display error message
    }

    return (
        <div className="recipe-list-container">
            <h1 className="recipe-list-title">Recipes</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or dietary tags"
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
            {filteredRecipes.length > 0 ? (
                <div className="recipe-grid">
                    {filteredRecipes.map((recipe) => (
                        <div className="recipe-card" key={recipe.id}>
                            <h2>{recipe.title}</h2>
                            <img
                                src={recipe.imageUrl || 'https://via.placeholder.com/300x200'}
                                alt={recipe.title}
                                className="recipe-image"
                            />
                            <p>
                                <strong>Ingredients:</strong>{' '}
                                {Array.isArray(recipe.ingredients)
                                    ? recipe.ingredients.join(', ')
                                    : recipe.ingredients}
                            </p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Dietary Tags:</strong> {recipe.dietaryTags?.join(', ') || 'None'}</p>
                            <div className="recipe-actions">
                                <button
                                    onClick={() => handleViewDetails(recipe.id)}
                                    className="view-details-button"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleDelete(recipe.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleAddToFavorites(recipe.id)}
                                    className="favorite-button"
                                >
                                    Add to Favorites
                                </button>
                            </div>
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
