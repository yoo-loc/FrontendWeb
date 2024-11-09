import React, { useState } from 'react';
import axios from 'axios';
import './RecipeForm.css';

const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions: '',
        dietaryTags: '',
        url: '',        
        imageUrl: ''    
    });
    const [message, setMessage] = useState('');  // State for success/failure message
    const [showPopup, setShowPopup] = useState(false); // State for popup visibility
    const [loading, setLoading] = useState(false); // Loading state for the button

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading state when submitting
        setMessage('');
        setShowPopup(false);  // Hide any previous popup

        try {
            const response = await axios.post('http://localhost:8080/recipes/post', formData);
            console.log('Recipe submitted:', response.data);
            setMessage('Post added successfully!');
            setShowPopup(true);

            // Reset form fields
            setFormData({
                title: '',
                ingredients: '',
                instructions: '',
                dietaryTags: '',
                url: '',        
                imageUrl: ''    
            });

            // Hide the popup after 3 seconds
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        } catch (error) {
            console.error('Error submitting recipe:', error);
            setMessage('Failed to submit recipe.');
            setShowPopup(true);
        } finally {
            setLoading(false); // Set loading state to false after request finishes
        }
    };

    return (
        <div>
            <form className="recipe-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <textarea
                    name="ingredients"
                    placeholder="Ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                />
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                />
                <input
                    type="text"
                    name="dietaryTags"
                    placeholder="Dietary Tags"
                    value={formData.dietaryTags}
                    onChange={handleChange}
                    className="form-input"
                />
                <input
                    type="url"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="form-input"
                />
                <button 
                    type="submit" 
                    className="form-button" 
                    disabled={loading}  // Disable the button if loading
                >
                    {loading ? 'Submitting...' : 'Submit Recipe'}
                </button>
            </form>

            {/* Popup for success/failure message */}
            {showPopup && (
                <div className="popup">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default RecipeForm;
