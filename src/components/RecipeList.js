import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading state for fetching recipes
    const [userId, setUserId] = useState(null); // Store the user's ID
    const navigate = useNavigate(); // Initialize useNavigate

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
                setUserId(storedUser.id); // Set the logged-in user's ID

                const response = await axios.get('http://localhost:8080/recipes/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedUser.token}`,
                    },
                    withCredentials: true,
                });
                setRecipes(response.data);
                setFilteredRecipes(response.data);
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
                : recipe.dietaryTags && recipe.dietaryTags.toLowerCase().includes(query);
            return titleMatch || tagsMatch;
        });
        setFilteredRecipes(filtered);
    };

    const handleDelete = async (id, ownerId) => {
        if (ownerId !== userId) {
            alert("You can only delete your own recipes.");
            return;
        }

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
                console.error('User is not authenticated.');
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
        navigate(`/recipes/${id}/details`); // Navigate to the RecipeDetail page
    };

    if (loading) {
        return <div className="loading-message">Loading recipes...</div>; // Display loading message while fetching
    }

    return (
        <div className="recipe-list-container">
            <h1 className="recipe-list-title">Recipes</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or dietary tags"
                />
                <button onClick={handleSearch}>Search</button>
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
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Dietary Tags:</strong> {recipe.dietaryTags}</p>
                            <button
                                className="view-details-button"
                                onClick={() => handleViewDetails(recipe.id)} // Navigate to RecipeDetail
                            >
                                View Details
                            </button>
                            <button
                                onClick={() => handleDelete(recipe.id, recipe.ownerId)}
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
                    ))}
                </div>
            ) : (
                <p className="no-recipes-message">No recipes found.</p>
            )}
        </div>
    );
};

export default RecipeList;
