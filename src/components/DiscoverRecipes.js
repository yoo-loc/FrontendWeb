import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiscoverRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/recipes/all', {
                    withCredentials: true,
                });

                // Sort recipes by newest creation date first (most recent at top)
                const sortedRecipes = response.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setRecipes(sortedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Failed to load recipes. Please try again later.');
            } finally {
                setLoading(false);
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
        setRecipes(filtered);
    };

    const handleViewDetails = (id) => {
        navigate(`/recipes/${id}/details`);
    };

    if (loading) {
        return <div className="loading-message">Loading recipes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="discover-recipes-container">
            <h1 className="discover-title">Discover Recipes</h1>
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
            {recipes.length > 0 ? (
                <div className="recipe-feed">
                    {recipes.map((recipe) => (
                        <div className="recipe-tweet" key={recipe.id}>
                            <div className="recipe-header">
                                <h2>{recipe.title}</h2>
                                <p className="recipe-time">
                                    {new Date(recipe.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <img
                                src={recipe.imageUrl || 'https://via.placeholder.com/300x200'}
                                alt={recipe.title}
                                className="recipe-image"
                            />
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Dietary Tags:</strong> {recipe.dietaryTags?.join(', ') || 'None'}</p>
                            <button
                                onClick={() => handleViewDetails(recipe.id)}
                                className="view-details-button"
                            >
                                View Details
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

export default DiscoverRecipes;
