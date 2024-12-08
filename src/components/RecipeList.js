import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    // const [visibleIngredients, setVisibleIngredients] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/recipes/all', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });


                const sortedRecipes = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setRecipes(sortedRecipes);
                setFilteredRecipes(sortedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Failed to fetch recipes. Please try again later.');
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
        setFilteredRecipes(filtered);
    };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:8080/recipes/${id}`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             withCredentials: true,
    //         });

    //         setRecipes(recipes.filter((recipe) => recipe.id !== id));
    //         setFilteredRecipes(filteredRecipes.filter((recipe) => recipe.id !== id));
    //         alert('Recipe deleted successfully!');
    //     } catch (error) {
    //         console.error('Error deleting recipe:', error);
    //         setError('Failed to delete the recipe. Please try again.');
    //     }
    // };

    const handleViewDetails = (id) => {
        navigate(`/recipes/${id}/details`);
    };

    // const toggleVisibility = (id) => {
    //     setVisibleIngredients((prevState) => ({
    //         ...prevState,
    //         [id]: !prevState[id],
    //     }));
    // };

    if (loading) {
        return <div className="loading-message">Loading recipes...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="recipe-list-container">
            <h1 className="recipe-list-title">Recipes</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or tags"
                    className="search-input"
                />
                <button onClick={handleSearch} className="view-details-button">Search</button>
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
                            <p><strong>Tags:</strong> {recipe.dietaryTags?.join(', ') || 'None'}</p>
                            <p><strong>Posted At:</strong> {new Date(recipe.createdAt).toLocaleString()}</p>
                            <div className="recipe-actions">
                                <button
                                    onClick={() => handleViewDetails(recipe.id)}
                                    className="view-details-button"
                                >
                                    View Details
                                </button>
                                {/* <button
                                    onClick={() => handleDelete(recipe.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button> */}
                            

                            {/* Ingredients and Instructions Toggle */}
                            
                                {/* <button
                                    onClick={() => toggleVisibility(recipe.id)}
                                    className="view-details-button"
                                >
                                    {visibleIngredients[recipe.id] ? 'Hide Details' : 'Show Details'}
                                </button> */}
                                {/* {visibleIngredients[recipe.id] && (
                                    <>
                                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                                        <p><strong>Instructions:</strong> {recipe.instructions}</p>
                                    </>
                                )} */}
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
