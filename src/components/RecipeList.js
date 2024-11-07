import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes from the backend
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

    return (
        <div>
            <h1>Recipes</h1>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe.id}>
                            <h2>{recipe.title}</h2>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Dietary Tags:</strong> {recipe.dietaryTags}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recipes found.</p>
            )}
        </div>
    );
};

export default RecipeList;
