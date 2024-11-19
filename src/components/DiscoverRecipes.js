import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DiscoverRecipes.css';

const DiscoverRecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchDiscoverRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/recipes/discover');
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching discover recipes:', error);
            }
        };

        fetchDiscoverRecipes();
    }, []);

    const groupedRecipes = recipes.reduce((groups, recipe) => {
        const { dietaryTags = 'Other' } = recipe; // Group by dietaryTags or 'Other'
        if (!groups[dietaryTags]) {
            groups[dietaryTags] = [];
        }
        groups[dietaryTags].push(recipe);
        return groups;
    }, {});

    return (
        <div className="discover-container">
            <h1 className="discover-title">Discover Unique Recipes</h1>
            {Object.keys(groupedRecipes).map((category) => (
                <div key={category} className="category-group">
                    <h2 className="category-title">{category}</h2>
                    <div className="recipe-grid">
                        {groupedRecipes[category].map((recipe) => (
                            <div key={recipe._id} className="recipe-card">
                                <h3 className="recipe-title">{recipe.title}</h3>
                                <img src={recipe.imageUrl || 'https://via.placeholder.com/300x200'} alt={recipe.title} />
                                <p className="recipe-instructions">{recipe.instructions}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiscoverRecipes;
