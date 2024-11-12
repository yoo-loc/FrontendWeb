import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    isLoggedIn, 
    getUserData, 
    getCommentsByRecipeId, 
    getFavoritesByUserId, 
    getRecipeById, 
    deleteCommentById, 
    editCommentById, 
    removeFavorite 
} from '../services/dataService';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const [recipeNames, setRecipeNames] = useState({}); // Map of recipe_id to recipe name

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login");
        } else {
            const userData = getUserData();
            setUser(userData);

            // Fetch user's favorites
            getFavoritesByUserId(userData.user_id).then((favoritesData) => {
                Promise.all(
                    favoritesData.map((favorite) => getRecipeById(favorite.recipe_id))
                ).then(setFavorites);
            });

            // Fetch user's comments and recipe names
            Promise.all(
                [1, 2, 3].map((recipeId) => 
                    getCommentsByRecipeId(recipeId).then((recipeComments) =>
                        recipeComments.filter((comment) => comment.user_id === userData.user_id)
                    )
                )
            ).then((commentsArray) => {
                const allComments = commentsArray.flat();
                setComments(allComments);

                // Fetch recipe names for comments
                const uniqueRecipeIds = [...new Set(allComments.map((comment) => comment.recipe_id))];
                Promise.all(uniqueRecipeIds.map((id) => getRecipeById(id))).then((recipes) => {
                    const namesMap = recipes.reduce((acc, recipe) => {
                        acc[recipe.recipe_id] = recipe.name;
                        return acc;
                    }, {});
                    setRecipeNames(namesMap);
                });
            });
        }
    }, [navigate]);

    // Handle unfavorite
    const handleUnfavorite = (recipeId) => {
        removeFavorite(user.user_id, recipeId).then(() => {
            setFavorites(favorites.filter((recipe) => recipe.recipe_id !== recipeId));
        });
    };

    // Handle comment deletion
    const handleDeleteComment = (commentId) => {
        deleteCommentById(commentId).then((response) => {
            if (response.success) {
                setComments(comments.filter((comment) => comment.comment_id !== commentId));
            }
        });
    };

    // Handle entering edit mode for a comment
    const handleEditComment = (commentId, text) => {
        setEditingCommentId(commentId);
        setEditingText(text);
    };

    // Handle saving an edited comment
    const handleSaveEditComment = () => {
        if (editingText.trim()) {
            editCommentById(editingCommentId, editingText).then((updatedComment) => {
                setComments(
                    comments.map((comment) =>
                        comment.comment_id === updatedComment.comment_id
                            ? { ...comment, text: updatedComment.content }
                            : comment
                    )
                );
                setEditingCommentId(null);
                setEditingText("");
            });
        }
    };

    if (!user) return null;

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>Welcome, {user.name}!</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>

            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
            <button onClick={() => navigate('/login')}>Logout</button>

            <h3>Your Favorites</h3>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map((recipe) => (
                        <li key={recipe.recipe_id}>
                            <h4>{recipe.name}</h4>
                            <p><strong>Category:</strong> {recipe.category}</p>
                            <p>{recipe.description}</p>
                            <button 
                                onClick={() => handleUnfavorite(recipe.recipe_id)} 
                                style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                            >
                                Remove from Favorites
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no favorite recipes yet.</p>
            )}

            <h3>Your Comments</h3>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.comment_id}>
                            {editingCommentId === comment.comment_id ? (
                                <>
                                    <textarea
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                                    />
                                    <button 
                                        onClick={handleSaveEditComment} 
                                        style={{ background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginRight: '10px' }}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        onClick={() => setEditingCommentId(null)} 
                                        style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>Comment on {recipeNames[comment.recipe_id] || "Recipe"}:</strong> {comment.text}
                                    </p>
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
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not commented on any recipes yet.</p>
            )}
        </div>
    );
};

export default Profile;
