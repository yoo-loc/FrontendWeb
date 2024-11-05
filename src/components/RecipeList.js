import React, { useEffect, useState } from 'react';
import { getAllRecipes } from '../services/recipeService';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const data = await getAllRecipes();
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
