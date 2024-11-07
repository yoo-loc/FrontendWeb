import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, getAllRecipes, getRecipesByCategory } from '../services/dataService';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    // Fetch all or filtered recipes based on the selected category
    useEffect(() => {
        if (selectedCategory) {
            getRecipesByCategory(selectedCategory).then(setRecipes);
        } else {
            getAllRecipes().then(setRecipes);
        }
    }, [selectedCategory]);

    // Handle category selection
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <h2>Recipes</h2>

            {/* Category filter buttons */}
            <div style={{ marginBottom: '20px' }}>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        style={{
                            marginRight: '10px',
                            padding: '5px 10px',
                            backgroundColor: selectedCategory === category ? 'lightblue' : 'white',
                            border: '1px solid #ccc',
                            cursor: 'pointer'
                        }}
                    >
                        {category}
                    </button>
                ))}
                <button
                    onClick={() => setSelectedCategory("")}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: selectedCategory === "" ? 'lightblue' : 'white',
                        border: '1px solid #ccc',
                        cursor: 'pointer'
                    }}
                >
                    Show All
                </button>
            </div>

            {/* Recipe list */}
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.recipe_id} style={{ marginBottom: '15px', listStyle: 'none' }}>
                            <Link to={`/recipe/${recipe.recipe_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                <h3>{recipe.name}</h3>
                            </Link>
                            <p><strong>Category:</strong> {recipe.category}</p>
                            <p>{recipe.description}</p>
                            <p><strong>Favorites:</strong> {recipe.favorites_count}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recipes available for this category.</p>
            )}
        </div>
    );
};

export default RecipeList;
