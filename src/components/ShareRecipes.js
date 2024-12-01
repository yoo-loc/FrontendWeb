import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShareRecipes = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/add-recipe'); // Replace with the correct path for your "Add Recipe" page
    };

    return (
        <div>
            <h1>Share a Recipe (Broken)</h1>
            <p>This page is currently broken. Please use the <strong>Add Recipe</strong> page instead.</p>
            <button onClick={handleRedirect} style={{ padding: '10px', background: '#FF5733', color: 'white', border: 'none', cursor: 'pointer' }}>
                Go to Add Recipe
            </button>
        </div>
    );
};

export default ShareRecipes;
