import React, { useEffect,useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const RecipeDetail = () => {
    const commentsEndRef = useRef(null); 
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [isEditingRecipe, setIsEditingRecipe] = useState(false);
    const [updatedRecipe, setUpdatedRecipe] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchRecipeData = async () => {
            try {
                const storedUser = JSON.parse(sessionStorage.getItem('user'));
                if (!storedUser) {
                    throw new Error('No user information available. Redirecting to login.');
                }
                setUser(storedUser);

                const [recipeResponse, commentsResponse, favoritesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/recipes/${id}`, { withCredentials: true }),
                    axios.get(`http://localhost:8080/recipes/${id}/comments`, { withCredentials: true }),
                    axios.get(`http://localhost:8080/recipes/favorites/${storedUser.id}`, { withCredentials: true }),
                ]);

                setRecipe(recipeResponse.data);
                setComments(commentsResponse.data);
                setIsFavorite(favoritesResponse.data.some((fav) => fav.id === id));
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

    const handleEditRecipe = async () => {
        try {
            await axios.patch(`http://localhost:8080/recipes/${id}`, updatedRecipe, { withCredentials: true });
    
            // Refresh the recipe details after a successful update
            const recipeResponse = await axios.get(`http://localhost:8080/recipes/${id}`, { withCredentials: true });
            setRecipe(recipeResponse.data);
    
            setIsEditingRecipe(false); // Exit editing mode
            setError('');
        } catch (error) {
            console.error('Error updating recipe:', error);
            setError('Failed to update the recipe. Please try again later.');
        }
    };
    

// comment


    const handleDeleteRecipe = async () => {
        try {
            await axios.delete(`http://localhost:8080/recipes/${id}`, { withCredentials: true });
            navigate('/recipes');
        } catch (error) {
            console.error('Error deleting recipe:', error);
            setError('Failed to delete the recipe. Please try again later.');
        }
    };

    const handleToggleFavorite = async () => {
        try {
            if (!isFavorite) {
                const response = await axios.post(`http://localhost:8080/recipes/${id}/favorites`, {}, { withCredentials: true });
                setIsFavorite(true);
                setRecipe((prev) => ({
                    ...prev,
                    favoritesCount: response.data.favoritesCount,
                }));
            } else {
                const response = await axios.delete(`http://localhost:8080/recipes/${id}/favorites`, { withCredentials: true });
                setIsFavorite(false);
                setRecipe((prev) => ({
                    ...prev,
                    favoritesCount: response.data.favoritesCount,
                }));
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            setError('Failed to update favorite status. Please try again later.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedRecipe((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                // Post the new comment
                await axios.post(
                    `http://localhost:8080/recipes/${id}/comments`,
                    { content: newComment },
                    { withCredentials: true }
                );
    
                // Fetch the updated comments list
                const commentsResponse = await axios.get(`http://localhost:8080/recipes/${id}/comments`, {
                    withCredentials: true,
                });
    
                // Update the state with the new list of comments
                setComments(commentsResponse.data);
    
                // Clear the input field and any previous error
                setNewComment('');
                setError('');
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
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Failed to delete comment. Please try again later.');
        }
    };

    const handleEditComment = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditedCommentContent(content);
    };

    const handleSaveEditedComment = async () => {
        if (!editedCommentContent.trim()) {
            setError('Comment content cannot be empty.');
            return;
        }
        try {
            await axios.patch(
                `http://localhost:8080/recipes/${id}/comments/${editingCommentId}`,
                { content: editedCommentContent },
                { withCredentials: true }
            );
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === editingCommentId
                        ? { ...comment, content: editedCommentContent, editedAt: new Date().toISOString() }
                        : comment
                )
            );
            setEditingCommentId(null);
            setEditedCommentContent('');
        } catch (error) {
            console.error('Error editing comment:', error);
            setError('Failed to edit comment. Please try again later.');
        }
    };

    if (loading) return <div>Loading recipe details...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="recipe-detail-container">
           

            {!isEditingRecipe ? (
                <div className="recipe-card">
                    <h1>{recipe.title}</h1>
                    <img
                        src={recipe.imageUrl || 'https://via.placeholder.com/600x400'}
                        alt={recipe.title}
                        className="recipe-image"
                    />
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                    <p><strong>Dietary Tags:</strong> {Array.isArray(recipe.dietaryTags) ? recipe.dietaryTags.join(', ') : 'None'}</p>
                    <p><strong>Favorites:</strong> {recipe.favoritesCount}</p>
                    <button className="favorite-btn" onClick={handleToggleFavorite}>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                    {user.id === recipe.ownerId && (
                        <div className="owner-actions">
                            <button className="edit-btn" onClick={() => setIsEditingRecipe(true)}>Edit Recipe</button>
                            <button className="delete-btn" onClick={handleDeleteRecipe}>Delete Recipe</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="edit-recipe-form">
                    <h1>Edit Recipe</h1>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        defaultValue={recipe.title}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="ingredients"
                        placeholder="Ingredients"
                        defaultValue={recipe.ingredients}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="instructions"
                        placeholder="Instructions"
                        defaultValue={recipe.instructions}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="dietaryTags"
                        placeholder="Dietary Tags (comma-separated)"
                        defaultValue={Array.isArray(recipe.dietaryTags) ? recipe.dietaryTags.join(', ') : ''}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        defaultValue={recipe.imageUrl}
                        onChange={handleInputChange}
                    />
                    <button className="save-btn" onClick={handleEditRecipe}>Save</button>
                    <button className="cancel-btn" onClick={() => setIsEditingRecipe(false)}>Cancel</button>
                </div>
            )}

            <h3>Comments</h3>
            <ul className="comments-list">
    {comments
        .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort by createdAt (ascending order)
        .map((comment) => (
            <li key={comment.id} className="comment-item">
                {editingCommentId === comment.id ? (
                    <div>
                        <textarea
                            value={editedCommentContent}
                            onChange={(e) => setEditedCommentContent(e.target.value)}
                            className="edit-comment-textarea"
                        />
                        <button className="save-btn" onClick={handleSaveEditedComment}>Save</button>
                        <button className="cancel-btn" onClick={() => setEditingCommentId(null)}>Cancel</button>
                    </div>
                ) : (
                    <div className="comment-content">
                        <p><strong>{comment.username}:</strong> {comment.content}</p>
                        <p className="comment-date">
                            <em>Posted on: {new Date(comment.createdAt).toLocaleString()}</em>
                            {comment.editedAt && (
                                <span> (Last edited: {new Date(comment.editedAt).toLocaleString()})</span>
                            )}
                        </p>
                        {user && user.id === comment.userId && (
                            <div className="comment-actions">
                                <button className="edit-btn" onClick={() => handleEditComment(comment.id, comment.content)}>
                                    Edit
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                )}
            </li>
        ))}
    <div ref={commentsEndRef} /> {/* Scroll to the bottom */}
</ul>


            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                className="new-comment-textarea"
            />
            <button className="add-comment-btn" onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

export default RecipeDetail;
