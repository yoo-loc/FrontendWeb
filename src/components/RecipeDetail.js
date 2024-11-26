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
    const [user, setUser] = useState(null); // State to store the logged-in user info

    useEffect(() => {
        const fetchUserInfo = () => {
            // Fetch user info from sessionStorage for testing
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            if (storedUser) {
                setUser(storedUser);
            } else {
                setError('No user information available. Please log in.');
                navigate('/login');
            }
        };

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

        fetchUserInfo();
        fetchRecipeDetails();
    }, [id, navigate]);

    const handleAddComment = async () => {
        // Validate the new comment
        if (!newComment.trim()) {
            setError('Comment content cannot be empty.');
            return;
        }

        try {
            if (!user) {
                setError('You need to log in to add comments.');
                navigate('/login');
                return;
            }

            // Prepare the comment data
            const commentData = {
                content: newComment,
            };

            // Send POST request to add a new comment
            const response = await axios.post(
                `http://localhost:8080/recipes/${id}/comments`,
                commentData,
                {
                    withCredentials: true, // Send session cookie
                }
            );

            // Add the new comment to the list of comments
            setComments([...comments, response.data.comment]);
            setNewComment(''); // Clear the input field after successful comment submission
        } catch (error) {
            console.error('Error adding comment:', error);
            if (error.response?.status === 403) {
                setError('You do not have permission to add comments. Please log in.');
            } else {
                setError('Failed to add comment. Please try again later.');
            }
        }
    };

    if (loading) return <div>Loading recipe details...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="recipe-detail-container">
            {/* Display user info at the top for testing purposes */}
            {user && (
                <div className="user-info">
                    <h3>User Info (for testing purposes):</h3>
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}

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
                        <p>
                            <strong>{comment.username}:</strong> {comment.content}
                        </p>
                        <p className="comment-date">
                            <em>Posted on: {new Date(comment.createdAt).toLocaleString()}</em>
                        </p>
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
