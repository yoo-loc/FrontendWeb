import React, { useState } from 'react';
import axios from 'axios';

const ShareRecipes = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newRecipe = {
                title,
                ingredients,
                instructions,
                imageUrl,
            };
            await axios.post('http://localhost:8080/recipes/share', newRecipe);
            alert('Recipe shared successfully!');
        } catch (error) {
            console.error('Error sharing recipe:', error);
            alert('Failed to share recipe.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Share Your Recipe</h2>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Ingredients" 
                value={ingredients} 
                onChange={(e) => setIngredients(e.target.value)} 
                required 
            />
            <textarea 
                placeholder="Instructions" 
                value={instructions} 
                onChange={(e) => setInstructions(e.target.value)} 
                required 
            />
            <input 
                type="text" 
                placeholder="Image URL" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
            />
            <button type="submit">Share Recipe</button>
        </form>
    );
};

export default ShareRecipes;
