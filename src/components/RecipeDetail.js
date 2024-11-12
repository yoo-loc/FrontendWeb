import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    getRecipeById, 
    getCommentsByRecipeId, 
    addComment, 
    deleteCommentById, 
    getUsernameById, 
    getUserData,
    editCommentById,
    getFavoritesByUserId,
    addFavorite,
    removeFavorite
} from '../services/dataService';

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    // Fetch recipe details, comments, user data, and favorite status
    useEffect(() => {
        const user = getUserData();
        setCurrentUser(user);
        getRecipeById(Number(recipeId)).then(setRecipe);
        getCommentsByRecipeId(Number(recipeId)).then(setComments);

        if (user) {
            getFavoritesByUserId(user.user_id).then((favorites) => {
                const favorited = favorites.some((fav) => fav.recipe_id === Number(recipeId));
                setIsFavorited(favorited);
            });
        }
    }, [recipeId]);

    // Handle toggling favorite status
    const handleToggleFavorite = () => {
        if (isFavorited) {
            removeFavorite(currentUser.user_id, Number(recipeId)).then(() => {
                setIsFavorited(false);
            });
        } else {
            addFavorite(currentUser.user_id, Number(recipeId)).then(() => {
                setIsFavorited(true);
            });
        }
    };

    // Handle comment submission
    const handleAddComment = () => {
        if (newComment.trim()) {
            addComment(Number(recipeId), currentUser?.user_id, newComment).then((comment) => {
                setComments([...comments, comment]);
                setNewComment("");
            });
        }
    };

    // Handle comment deletion
    const handleDeleteComment = (comment_id) => {
        deleteCommentById(comment_id).then((response) => {
            if (response.success) {
                setComments(comments.filter((comment) => comment.comment_id !== comment_id));
            }
        });
    };

    // Handle entering edit mode for a comment
    const handleEditComment = (comment_id, text) => {
        setEditingCommentId(comment_id);
        setEditingText(text);
    };

    // Handle saving the edited comment
    const handleSaveEditComment = () => {
        if (editingText.trim()) {
            editCommentById(editingCommentId, editingText).then((updatedComment) => {
                setComments(
                    comments.map((comment) =>
                        comment.comment_id === updatedComment.comment_id
                            ? { ...comment, text: updatedComment.content } // Update the comment text
                            : comment
                    )
                );
                setEditingCommentId(null);
                setEditingText("");
            });
        }
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h1>{recipe.name}</h1>
            <img 
                src={recipe.image} 
                alt={`${recipe.name}`} 
                style={{ width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '15px' }}
            />
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Description:</strong> {recipe.description}</p>
            <p><strong>Favorites Count:</strong> {recipe.favorites_count}</p>
            <h3>Steps</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>{step}</li>
                ))}
            </ol>

            {/* Favorite Button */}
            {currentUser && (
                <button 
                    onClick={handleToggleFavorite}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: isFavorited ? '#dc3545' : '#007BFF',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '20px',
                        fontWeight: 'bold'
                    }}
                >
                    {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            )}

            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul style={{ padding: 0, listStyleType: 'none' }}>
                    {comments.map((comment) => (
                        <li key={comment.comment_id} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                            <p style={{ fontWeight: 'bold', margin: 0 }}>{getUsernameById(comment.user_id)}</p>
                            {editingCommentId === comment.comment_id ? (
                                <>
                                    <textarea
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                    />
                                    <button 
                                        onClick={handleSaveEditComment} 
                                        style={{ padding: '5px 10px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', marginRight: '10px' }}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditingCommentId(null)} 
                                        style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p style={{ margin: '5px 0' }}>{comment.text}</p>
                                    {currentUser?.user_id === comment.user_id && (
                                        <>
                                            <button 
                                                onClick={() => handleEditComment(comment.comment_id, comment.text)} 
                                                style={{ background: '#ffc107', color: 'black', border: 'none', padding: '5px 10px', cursor: 'pointer', marginRight: '10px' }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteComment(comment.comment_id)} 
                                                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}

            {currentUser && (
                <>
                    <h3>Add a Comment</h3>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here"
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                    />
                    <button 
                        onClick={handleAddComment} 
                        style={{ padding: '5px 10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}
                    >
                        Submit
                    </button>
                </>
            )}
        </div>
    );
};

export default RecipeDetail;
