// src/components/RecipeDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    getRecipeById, 
    getCommentsByRecipeId, 
    addComment, 
    deleteCommentById, 
    getUsernameById,
    getFavoritesByUserId,
    addFavorite,
    removeFavorite
} from '../services/dataService';

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isFavorited, setIsFavorited] = useState(false);
    const currentUserId = 1; // Hardcoded user ID for this example

    // Fetch the recipe details, comments, and favorite status when the component mounts
    useEffect(() => {
        getRecipeById(Number(recipeId)).then(setRecipe);
        getCommentsByRecipeId(Number(recipeId)).then(setComments);
        getFavoritesByUserId(currentUserId).then((favorites) => {
            const favorited = favorites.some(fav => fav.recipe_id === Number(recipeId));
            setIsFavorited(favorited);
        });
    }, [recipeId]);

    // Toggle favorite status
    const handleToggleFavorite = () => {
        if (isFavorited) {
            removeFavorite(currentUserId, Number(recipeId)).then(() => setIsFavorited(false));
        } else {
            addFavorite(currentUserId, Number(recipeId)).then(() => setIsFavorited(true));
        }
    };

    // Handle comment submission
    const handleAddComment = () => {
        if (newComment.trim()) {
            addComment(Number(recipeId), currentUserId, newComment).then((comment) => {
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

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <img 
                src={recipe.image} 
                alt={`${recipe.name}`} 
                style={{ width: '100%', maxWidth: '600px', height: 'auto', marginBottom: '15px' }}
            />
            <p><strong>Category:</strong> {recipe.category}</p>
            <p>{recipe.description}</p>
            <p><strong>Favorites:</strong> {recipe.favorites_count}</p>

            {/* Favorite Button */}
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

            <h3>Steps</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>{step}</li>
                ))}
            </ol>

            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul style={{ padding: 0, listStyleType: 'none' }}>
                    {comments.map((comment) => (
                        <li key={comment.comment_id} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                            <p style={{ fontWeight: 'bold', margin: 0 }}>{getUsernameById(comment.user_id)}</p>
                            <p style={{ margin: '5px 0' }}>{comment.content}</p>
                            {comment.user_id === currentUserId && (
                                <button onClick={() => handleDeleteComment(comment.comment_id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                                    Delete
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}

            <h3>Add a Comment</h3>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment here"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleAddComment} style={{ padding: '5px 10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>Submit</button>
        </div>
    );
};

export default RecipeDetail;
