import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        dietaryTags: '',
        url: '',        // New field for URL
        imageUrl: ''    // New field for image URL
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/recipes/post', formData);
            console.log('Recipe submitted:', response.data);
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="ingredients"
                placeholder="Ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
            />
            <textarea
                name="instructions"
                placeholder="Instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="dietaryTags"
                placeholder="Dietary Tags"
                value={formData.dietaryTags}
                onChange={handleChange}
            />
            <input
                type="url"
                name="url"
                placeholder="Recipe URL"
                value={formData.url}
                onChange={handleChange}
            />
            <input
                type="url"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
            />
            <button type="submit">Submit Recipe</button>
        </form>
    );
};

export default RecipeForm;
