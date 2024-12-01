import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
    const { id } = useParams(); // Recipe ID from route params
    const navigate = useNavigate(); // For redirecting to login if unauthorized
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isFavorite, setIsFavorite] = useState(false); // Track if the recipe is a favorite
    const [favoritesCount, setFavoritesCount] = useState(0); // Track the number of favorites
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null); // State to store the logged-in user info
    const [editingComment, setEditingComment] = useState(null); // Comment being edited
    const [editedContent, setEditedContent] = useState(''); // Edited comment content

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                // Fetch user info from session storage
                const storedUser = JSON.parse(sessionStorage.getItem('user'));
                if (!storedUser) {
                    throw new Error('No user information available. Redirecting to login.');
                }
                setUser(storedUser);

                // Fetch recipe, comments, and favorites data
                const [recipeResponse, commentsResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/recipes/${id}`, { withCredentials: true }),
                    axios.get(`http://localhost:8080/recipes/${id}/comments`, { withCredentials: true }),
                ]);

                // Update state with fetched data
                const recipeData = recipeResponse.data;
                setRecipe(recipeData);
                setComments(commentsResponse.data);
                setIsFavorite(storedUser.favorites?.includes(id) || false);
                setFavoritesCount(recipeData.favoritesCount || 0); // Set the initial favorites count
            } catch (error) {
                console.error('Error fetching recipe data:', error);
                if (error.response?.status === 401) {
                    sessionStorage.clear();
                    navigate('/login');
                } else {
                    setError(error.message || 'Failed to fetch recipe details. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeData();
    }, [id, navigate]);

    const handleToggleFavorite = async () => {
        try {
            if (!isFavorite) {
                // Add to favorites
                await axios.post(`http://localhost:8080/recipes/${id}/favorites`, {}, { withCredentials: true });
                setIsFavorite(true);
                setFavoritesCount((prevCount) => prevCount + 1); // Increment favorites count
            } else {
                // Remove from favorites
                await axios.delete(`http://localhost:8080/recipes/${id}/favorites`, { withCredentials: true });
                setIsFavorite(false);
                setFavoritesCount((prevCount) => prevCount - 1); // Decrement favorites count
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            setError('Failed to update favorite status. Please try again later.');
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const response = await axios.post(
                    `http://localhost:8080/recipes/${id}/comments`,
                    { content: newComment },
                    { withCredentials: true }
                );
                setComments([...comments, response.data.comment]);
                setNewComment('');
            } catch (error) {
                console.error('Error adding comment:', error);
                setError('Failed to add comment. Please try again later.');
            }
        } else {
            setError('Comment content cannot be empty.');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/recipes/${id}/comments/${commentId}`, {
                withCredentials: true,
            });
            setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Failed to delete comment. Please try again later.');
        }
    };

    const handleEditComment = (commentId, content) => {
        setEditingComment(commentId);
        setEditedContent(content);
    };

    const handleSaveEditedComment = async () => {
        if (!editedContent.trim()) {
            setError('Comment content cannot be empty.');
            return;
        }
        try {
            await axios.patch(
                `http://localhost:8080/recipes/${id}/comments/${editingComment}`,
                { content: editedContent },
                { withCredentials: true }
            );
            setComments(
                comments.map((comment) =>
                    comment.id === editingComment
                        ? { ...comment, content: editedContent, editedAt: new Date().toISOString() }
                        : comment
                )
            );
            setEditingComment(null);
            setEditedContent('');
        } catch (error) {
            console.error('Error editing comment:', error);
            setError('Failed to edit comment. Please try again later.');
        }
    };

    if (loading) return <div>Loading recipe details...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="recipe-detail-container">
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
            <p><strong>Favorites:</strong> {favoritesCount}</p> {/* Display favorites count */}

            <button onClick={handleToggleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {editingComment === comment.id ? (
                            <div>
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                                <button onClick={handleSaveEditedComment}>Save</button>
                                <button onClick={() => setEditingComment(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    <strong>{comment.username}:</strong> {comment.content}
                                </p>
                                <p className="comment-date">
                                    <em>Posted on: {new Date(comment.createdAt).toLocaleString()}</em>
                                    {comment.editedAt && (
                                        <span> (Last edited: {new Date(comment.editedAt).toLocaleString()})</span>
                                    )}
                                </p>
                                {user && user.id === comment.userId && (
                                    <div>
                                        <button onClick={() => handleEditComment(comment.id, comment.content)}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
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
