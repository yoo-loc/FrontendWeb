import React, { useState } from 'react';
import { createRecipe } from '../services/recipeService';

const RecipeForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createRecipe({ title, ingredients: ingredients.split(','), instructions });
        alert('Recipe created!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" required />
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required />
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;
