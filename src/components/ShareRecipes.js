// src/components/ShareRecipes.js
import './RecipeForm.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // To make the POST request

const ShareRecipes = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(""); // Changed to text input for custom category
    const [image, setImage] = useState("");
    const [steps, setSteps] = useState(""); // Single text input for all steps
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {
            name,
            description,
            category,
            image,
            steps: steps.split("\n").filter(step => step.trim() !== "") // Split steps by new line and remove any empty lines
        };

        try {
            await axios.post('http://localhost:8080/recipes/share', newRecipe, {
                withCredentials: true, // Include session cookies if required
            });
            alert("Recipe shared successfully!");
            navigate("/recipes"); // Redirect to the recipe list after adding
        } catch (error) {
            console.error("Error sharing recipe:", error);
            alert("Failed to share recipe. Please try again.");
        }
    };

    return (
        <div>
            <h2>Share Your Recipe</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g., Main Course, Dessert"
                        required
                    />
                </label>
                <label>
                    Image (URL or local path):
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg or local path"
                    />
                </label>
                <label>
                    Steps (each step on a new line):
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder="Step 1: Do this...\nStep 2: Do that..."
                        rows="5"
                        required
                    />
                </label>
                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Share Recipe</button>
            </form>
        </div>
    );
};

export default ShareRecipes;
