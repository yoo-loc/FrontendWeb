// import { Link } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './UserFeed.css';

// function UserFeed() {
//     const [recipes, setRecipes] = useState([]);

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/recipes/all');
//                 setRecipes(response.data.reverse());
//             } catch (error) {
//                 console.error('Error fetching recipes:', error);
//             }
//         };

//         fetchRecipes();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8080/recipes/${id}`);
//             setRecipes(recipes.filter(recipe => recipe.id !== id));
//         } catch (error) {
//             console.error('Error deleting recipe:', error);
//         }
//     };

//     const handleLike = async (recipeId) => {
//         try {
//             const userId = '673aac47856eaf52b2171837';
//             await axios.post(`http://localhost:8080/recipes/favorites/${userId}`, { recipeId }, {
//                 headers: { 'Content-Type': 'application/json' }
//             });
//             alert('Liked the recipe!');
//         } catch (error) {
//             console.error('Error liking recipe:', error);
//             alert('Failed to like.');
//         }
//     };

//     const toggleShowMore = (id) => {
//         setRecipes((prevRecipes) => 
//             prevRecipes.map((recipe) => 
//                 recipe.id === id ? { ...recipe, showMore: !recipe.showMore } : recipe
//             )
//         );
//     };

// function UserFeed(){
//     return (
//         <div>
//             <h1>Welecome to User Feed</h1>
//         <div className="feed">
//             <h1 className="feed-title">Recipe Feed</h1>
//             {recipes.length > 0 ? (
//                 <div className="feed-content">
//                     {recipes.map((recipe) => (
//                         <div className="tweet" key={recipe.id}>
//                             <h2 className="tweet-title">{recipe.title}</h2>
//                             <img
//                                 src={recipe.imageUrl || 'https://via.placeholder.com/300x200'}
//                                 alt={recipe.title}
//                                 className="tweet-image"
//                             />
//                             <div className="tweet-actions">
//                                 <button onClick={() => handleDelete(recipe.id)} className="tweet-action-btn delete-btn">
//                                     Delete
//                                 </button>
//                                 <button onClick={() => handleLike(recipe.id)} className="tweet-action-btn like-btn">
//                                     Like
//                                 </button>
//                                 <button 
//                                     className="tweet-action-btn show-more-btn" 
//                                     onClick={() => toggleShowMore(recipe.id)}>
//                                     {recipe.showMore ? 'Show Less' : 'Show More'}
//                                 </button>
//                             </div>

//                             {recipe.showMore && (
//                                 <div className="recipe-details">
//                                     <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
//                                     <p><strong>Instructions:</strong> {recipe.instructions}</p>
//                                     <p><strong>Dietary Tags:</strong> {recipe.dietaryTags}</p>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="no-recipes-message">No recipes available!</p>
//             )}
//         </div>
//     );
// };
// export default UserFeed;