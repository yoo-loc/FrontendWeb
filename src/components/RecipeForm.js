import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        dietaryTags: '',
    });

    const handleChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/recipes/post', recipe, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Recipe saved:', response.data);
        } catch (error) {
            console.error('Error posting recipe:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Recipe Title"
                value={recipe.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="ingredients"
                placeholder="Ingredients"
                value={recipe.ingredients}
                onChange={handleChange}
                required
            />
            <textarea
                name="instructions"
                placeholder="Instructions"
                value={recipe.instructions}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="dietaryTags"
                placeholder="Dietary Tags"
                value={recipe.dietaryTags}
                onChange={handleChange}
            />
            <button type="submit">Submit Recipe</button>
        </form>
    );
};

export default RecipeForm;
