// src/services/dataService.js

// ========================
// Auth Service
// ========================

const mockUserSession = {
    isLoggedIn: false,
    userData: null
};

// Mock user database
const mockUsers = [
    { user_id: 1, username: "a", password: "a", email: "a@example.com", name: "Alice" },
    { user_id: 2, username: "b", password: "b", email: "b@example.com", name: "Bob" },
    { user_id: 3, username: "c", password: "c", email: "c@example.com", name: "Charlie" }
];

// Function to check if the user is logged in
export const isLoggedIn = () => mockUserSession.isLoggedIn;

// Function to get the current user's data
export const getUserData = () => mockUserSession.isLoggedIn ? mockUserSession.userData : null;

// Function to log in with username and password
export const login = (username, password) => {
    const user = mockUsers.find((u) => u.username === username && u.password === password);
    if (user) {
        mockUserSession.isLoggedIn = true;
        mockUserSession.userData = { ...user }; // Set user data in the session
        return { success: true, userData: mockUserSession.userData };
    } else {
        return { success: false, message: "Invalid username or password" };
    }
};

// Function to log out the user
export const logout = () => {
    mockUserSession.isLoggedIn = false;
    mockUserSession.userData = null;
};

// Function to get a username by user ID
export const getUsernameById = (user_id) => {
    const user = mockUsers.find((user) => user.user_id === user_id);
    return user ? user.username : "Unknown User";
};

// ========================
// Recipe Service
// ========================


let mockRecipes = [
    {
        recipe_id: 1,
        name: "Spaghetti Carbonara",
        category: "Main Course",
        description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        favorites_count: 10,
        image: "https://example.com/images/spaghetti-carbonara.jpg",
        steps: [
            "Boil a pot of salted water and cook the spaghetti according to package instructions.",
            "In a bowl, beat the eggs and mix in grated cheese.",
            "In a pan, cook pancetta until crispy, then remove from heat.",
            "Drain the pasta, then combine with pancetta in the pan.",
            "Quickly stir in the egg mixture to create a creamy sauce.",
            "Season with pepper and serve immediately."
        ]
    },
    {
        recipe_id: 2,
        name: "Chocolate Cake",
        category: "Dessert",
        description: "A rich, moist chocolate cake topped with creamy chocolate icing.",
        favorites_count: 25,
        image: "https://example.com/images/chocolate-cake.jpg",
        steps: [
            "Preheat oven to 350°F (175°C) and grease a cake pan.",
            "In a large bowl, mix flour, cocoa powder, sugar, and baking soda.",
            "Add eggs, milk, oil, and vanilla extract, and beat until smooth.",
            "Pour the batter into the prepared pan and bake for 30-35 minutes.",
            "Let the cake cool, then frost with chocolate icing."
        ]
    },
    {
        recipe_id: 3,
        name: "Caesar Salad",
        category: "Appetizer",
        description: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
        favorites_count: 15,
        image: "https://example.com/images/caesar-salad.jpg",
        steps: [
            "Wash and chop the romaine lettuce.",
            "In a large bowl, toss lettuce with Caesar dressing.",
            "Add croutons and grated Parmesan cheese.",
            "Toss the salad again and serve chilled."
        ]
    }
];

export const categories = ["Appetizer", "Main Course", "Dessert"];

// Function to get all categories
export const getCategories = () => categories;

// Function to add a new recipe
export const addRecipe = (newRecipe) => {
    // If the category doesn't exist, add it
    if (!categories.includes(newRecipe.category)) {
        categories.push(newRecipe.category);
    }

    const recipeWithId = {
        ...newRecipe,
        recipe_id: mockRecipes.length + 1,
        favorites_count: 0, // New recipes start with zero favorites
    };
    mockRecipes.push(recipeWithId);
    return Promise.resolve(recipeWithId);
};

export const getAllRecipes = () => new Promise((resolve) => {
    setTimeout(() => resolve(mockRecipes), 500);
});

export const getRecipeById = (recipe_id) => new Promise((resolve) => {
    const recipe = mockRecipes.find((r) => r.recipe_id === recipe_id);
    setTimeout(() => resolve(recipe || null), 500);
});

export const getRecipesByCategory = (category) => new Promise((resolve) => {
    const filteredRecipes = mockRecipes.filter((recipe) => recipe.category === category);
    setTimeout(() => resolve(filteredRecipes), 500);
});



export const updateFavoritesCount = (recipe_id, newCount) => new Promise((resolve) => {
    const recipeIndex = mockRecipes.findIndex((r) => r.recipe_id === recipe_id);
    if (recipeIndex !== -1) {
        mockRecipes[recipeIndex].favorites_count = newCount;
        setTimeout(() => resolve(mockRecipes[recipeIndex]), 500);
    } else {
        resolve(null);
    }
});

export const deleteRecipeById = (recipe_id) => new Promise((resolve) => {
    const recipeIndex = mockRecipes.findIndex((r) => r.recipe_id === recipe_id);
    if (recipeIndex !== -1) {
        const deletedRecipe = mockRecipes.splice(recipeIndex, 1)[0];
        setTimeout(() => resolve(deletedRecipe), 500);
    } else {
        resolve(null);
    }
});

// ========================
// Comment Service
// ========================

let mockComments = [
    { comment_id: 1, recipe_id: 1, user_id: 1, content: "This recipe was amazing! My family loved it." },
    { comment_id: 2, recipe_id: 1, user_id: 2, content: "I found it a bit salty, but overall great." },
    { comment_id: 3, recipe_id: 2, user_id: 1, content: "Perfect dessert for a family dinner!" },
    { comment_id: 4, recipe_id: 3, user_id: 3, content: "A refreshing starter before the main course." },
    { comment_id: 5, recipe_id: 3, user_id: 4, content: "Loved the Caesar dressing!" }
];

export const getCommentsByRecipeId = (recipe_id) => new Promise((resolve) => {
    const comments = mockComments.filter((comment) => comment.recipe_id === recipe_id);
    setTimeout(() => resolve(comments), 500);
});

export const addComment = (recipe_id, user_id, content) => new Promise((resolve) => {
    const newComment = { comment_id: mockComments.length + 1, recipe_id, user_id, content };
    mockComments.push(newComment);
    setTimeout(() => resolve(newComment), 500);
});

export const deleteCommentById = (comment_id) => new Promise((resolve) => {
    mockComments = mockComments.filter((comment) => comment.comment_id !== comment_id);
    setTimeout(() => resolve({ success: true }), 500);
});

export const editCommentById = (comment_id, newContent) => new Promise((resolve, reject) => {
    const commentIndex = mockComments.findIndex((comment) => comment.comment_id === comment_id);
    if (commentIndex === -1) {
        reject("Comment not found");
    } else {
        mockComments[commentIndex].content = newContent;
        setTimeout(() => resolve(mockComments[commentIndex]), 500);
    }
});

// ========================
// Favorites Service
// ========================

let mockFavorites = [
    { favorite_id: 1, user_id: 1, recipe_id: 1, favorited_at: new Date().toISOString() },
    { favorite_id: 2, user_id: 1, recipe_id: 2, favorited_at: new Date().toISOString() },
    { favorite_id: 3, user_id: 2, recipe_id: 1, favorited_at: new Date().toISOString() }
];

export const getFavoritesByUserId = (user_id) => new Promise((resolve) => {
    const favorites = mockFavorites.filter((fav) => fav.user_id === user_id);
    setTimeout(() => resolve(favorites), 500);
});

export const addFavorite = (user_id, recipe_id) => new Promise((resolve, reject) => {
    const existingFavorite = mockFavorites.find((fav) => fav.user_id === user_id && fav.recipe_id === recipe_id);
    if (existingFavorite) {
        reject("Recipe is already favorited by this user.");
    } else {
        const newFavorite = { favorite_id: mockFavorites.length + 1, user_id, recipe_id, favorited_at: new Date().toISOString() };
        mockFavorites.push(newFavorite);
        setTimeout(() => resolve(newFavorite), 500);
    }
});

export const removeFavorite = (user_id, recipe_id) => new Promise((resolve) => {
    mockFavorites = mockFavorites.filter((fav) => !(fav.user_id === user_id && fav.recipe_id === recipe_id));
    setTimeout(() => resolve({ success: true }), 500);
});
