import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const { id } = useParams(); // Recipe ID from route params
    const navigate = useNavigate(); // For redirecting to login if unauthorized
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/recipes/${id}/details`, {
                    withCredentials: true, // Send session cookie
                });

                setRecipe(response.data.recipe);
                setComments(response.data.comments);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                if (error.response?.status === 401) {
                    setError('Unauthorized access. Redirecting to login...');
                    sessionStorage.clear(); // Clear session storage
                    navigate('/login'); // Redirect to login page
                } else {
                    setError(error.response?.data?.message || 'Failed to fetch recipe details. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails();
    }, [id, navigate]);

    const handleAddComment = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/recipes/${id}/comments`,
                { content: newComment },
                {
                    withCredentials: true, // Send session cookie
                }
            );

            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Failed to add comment. Please try again later.');
        }
    };

    if (loading) return <div>Loading recipe details...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="recipe-detail-container">
            <h1>{recipe.title}</h1>
            <img
                src={recipe.imageUrl || 'https://via.placeholder.com/600x400'}
                alt={recipe.title}
                className="recipe-image"
            />
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Dietary Tags:</strong> {recipe.dietaryTags?.join(', ') || 'None'}</p>

            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <p><strong>{comment.username}:</strong> {comment.content}</p>
                    </li>
                ))}
            </ul>

            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

export default RecipeDetail;
