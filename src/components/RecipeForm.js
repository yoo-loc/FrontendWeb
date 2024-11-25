import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        dietaryTags: '',
        imageUrl: ''
    });

    const [message, setMessage] = useState(''); // Success or error message
    const [showPopup, setShowPopup] = useState(false); // Popup visibility
    const [loading, setLoading] = useState(false); // Loading state for the submit button

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Parse dietary tags into a list
    const parseDietaryTags = (tags) => {
        return tags.split(',').map((tag) => tag.trim()).filter((tag) => tag !== '');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setMessage(''); // Clear previous messages
        setShowPopup(false); // Hide previous popup

        try {
            // Parse dietaryTags into an array
            const dataToSubmit = {
                ...formData,
                dietaryTags: parseDietaryTags(formData.dietaryTags)
            };

            // POST request to backend with session credentials
            const response = await axios.post('http://localhost:8080/recipes', dataToSubmit, {
                withCredentials: true // Include cookies for session-based authentication
            });

            console.log('Recipe submitted:', response.data);

            setMessage('Recipe added successfully!');
            setShowPopup(true);

            // Reset form fields
            setFormData({
                title: '',
                ingredients: '',
                instructions: '',
                dietaryTags: '',
                imageUrl: ''
            });

            // Hide popup after 3 seconds
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting recipe:', error);

            // Error handling with detailed messages
            if (error.response) {
                setMessage(`Error: ${error.response.data.message || 'Failed to submit recipe.'}`);
            } else if (error.request) {
                setMessage('Error: No response from server.');
            } else {
                setMessage('Unexpected error occurred.');
            }

            setShowPopup(true);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div>
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
                    placeholder="Dietary Tags (comma-separated)"
                    value={formData.dietaryTags}
                    onChange={handleChange}
                />
                <input
                    type="url"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Recipe'}
                </button>
            </form>

            {/* Popup for success/failure message */}
            {showPopup && (
                <div>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default RecipeForm;
