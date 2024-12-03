import './RecipeForm.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(""); // Changed to text input for custom category
    const [image, setImage] = useState("");
    const [steps, setSteps] = useState(""); // Single text input for all steps
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the current time
        const creationTime = new Date().toISOString();

        const newRecipe = {
            name,
            description,
            category,
            image,
            steps: steps.split("\n").filter(step => step.trim() !== ""), // Split steps by new line and remove any empty lines
            createdAt: creationTime // Include the creation time
        };

        try {
            // Send the new recipe to the backend
            await fetch("http://localhost:8080/recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRecipe),
                credentials: "include" // Include session credentials if required
            });

            // Redirect to the recipe list after adding
            navigate("/recipes");
        } catch (error) {
            console.error("Error adding recipe:", error);
            alert("Failed to add recipe. Please try again.");
        }
    };

    return (
        <div>
            <h2>Add New Recipe</h2>
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
                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Submit Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;