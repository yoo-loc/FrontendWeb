// src/services/favoritesService.js

let mockFavorites = [
    { favorite_id: 1, user_id: 1, recipe_id: 1, favorited_at: new Date().toISOString() },
    { favorite_id: 2, user_id: 1, recipe_id: 2, favorited_at: new Date().toISOString() },
    { favorite_id: 3, user_id: 2, recipe_id: 1, favorited_at: new Date().toISOString() }
];

// Function to get all favorite recipes for a specific user
export const getFavoritesByUserId = (user_id) => {
    return new Promise((resolve) => {
        const favorites = mockFavorites.filter((fav) => fav.user_id === user_id);
        setTimeout(() => {
            resolve(favorites);
        }, 500); // Simulate network delay
    });
};

// Function to add a recipe to favorites
export const addFavorite = (user_id, recipe_id) => {
    return new Promise((resolve, reject) => {
        const existingFavorite = mockFavorites.find((fav) => fav.user_id === user_id && fav.recipe_id === recipe_id);
        
        if (existingFavorite) {
            reject("Recipe is already favorited by this user.");
        } else {
            const newFavorite = {
                favorite_id: mockFavorites.length + 1,
                user_id,
                recipe_id,
                favorited_at: new Date().toISOString()
            };
            mockFavorites.push(newFavorite);
            setTimeout(() => {
                resolve(newFavorite);
            }, 500);
        }
    });
};

// Function to remove a recipe from favorites
export const removeFavorite = (user_id, recipe_id) => {
    return new Promise((resolve) => {
        mockFavorites = mockFavorites.filter((fav) => !(fav.user_id === user_id && fav.recipe_id === recipe_id));
        setTimeout(() => {
            resolve({ success: true });
        }, 500);
    });
};
