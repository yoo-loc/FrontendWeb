// src/services/dataService.js

// ========================
// Mock Data & Auth Service
// ========================

const mockUserSession = { isLoggedIn: false, userData: null };
let mockUsers = [
    { user_id: 1, username: "a", password: "a", email: "a@example.com", name: "Alice" },
    { user_id: 2, username: "b", password: "b", email: "b@example.com", name: "Bob" },
    { user_id: 3, username: "c", password: "c", email: "c@example.com", name: "Charlie" }
];

export const login = (username, password) => {
    const user = mockUsers.find((u) => u.username === username && u.password === password);
    if (user) {
        mockUserSession.isLoggedIn = true;
        mockUserSession.userData = { ...user };
        return { success: true, userData: mockUserSession.userData };
    }
    return { success: false, message: "Invalid username or password" };
};

export const logout = () => {
    mockUserSession.isLoggedIn = false;
    mockUserSession.userData = null;
};

export const isLoggedIn = () => mockUserSession.isLoggedIn;
export const getUserData = () =>
    mockUserSession.isLoggedIn ? mockUserSession.userData : null;

export const signUp = (username, password, email, name) => {
    return new Promise((resolve, reject) => {
        if (mockUsers.some((user) => user.username === username || user.email === email)) {
            reject("Username or email already exists.");
        } else {
            const newUser = { user_id: mockUsers.length + 1, username, password, email, name };
            mockUsers.push(newUser);
            resolve(newUser);
        }
    });
};

export const getUsernameById = (user_id) => {
    const user = mockUsers.find((user) => user.user_id === user_id);
    return user ? user.username : "Unknown User";
};

// ========================
// Recipe Service
// ========================

const mockRecipes = [
    {
        recipe_id: 1,
        name: "Spaghetti Carbonara",
        category: "Main Course",
        description: "Classic Italian pasta with eggs, cheese, pancetta, and pepper.",
        favorites_count: 10,
        image: "https://example.com/images/spaghetti-carbonara.jpg",
        steps: [
            "Boil water and cook spaghetti.",
            "Mix eggs and cheese in a bowl.",
            "Cook pancetta until crispy.",
            "Combine pasta and pancetta, stir in egg mixture."
        ]
    },
    {
        recipe_id: 2,
        name: "Avocado Toast",
        category: "Breakfast",
        description: "Simple and delicious avocado on toast with toppings.",
        favorites_count: 25,
        image: "https://example.com/images/avocado-toast.jpg",
        steps: [
            "Toast the bread.",
            "Mash avocado with salt and pepper.",
            "Spread avocado on toast.",
            "Top with sliced radishes, tomatoes, or an egg, if desired."
        ]
    },
    {
        recipe_id: 3,
        name: "Chocolate Chip Cookies",
        category: "Dessert",
        description: "Soft and chewy chocolate chip cookies.",
        favorites_count: 50,
        image: "https://example.com/images/chocolate-chip-cookies.jpg",
        steps: [
            "Preheat oven to 350°F (175°C).",
            "Mix butter, sugar, and eggs in a bowl.",
            "Add flour, baking soda, and chocolate chips.",
            "Scoop dough onto baking sheet and bake for 10-12 minutes."
        ]
    }
];
export const categories = ["Appetizer", "Main Course", "Dessert", "Breakfast"];

export const getCategories = () => categories;

export const addRecipe = (newRecipe) => {
    if (!categories.includes(newRecipe.category)) categories.push(newRecipe.category);
    const recipeWithId = { ...newRecipe, recipe_id: mockRecipes.length + 1, favorites_count: 0 };
    mockRecipes.push(recipeWithId);
    return Promise.resolve(recipeWithId);
};

export const getAllRecipes = () => Promise.resolve([...mockRecipes]);
export const getRecipeById = (recipe_id) => Promise.resolve(mockRecipes.find((r) => r.recipe_id === recipe_id) || null);
export const getRecipesByCategory = (category) => Promise.resolve(mockRecipes.filter((recipe) => recipe.category === category));

export const updateFavoritesCount = (recipe_id, newCount) => {
    const recipe = mockRecipes.find((r) => r.recipe_id === recipe_id);
    if (recipe) {
        recipe.favorites_count = newCount;
        return Promise.resolve(recipe);
    }
    return Promise.resolve(null);
};

export const deleteRecipeById = (recipe_id) => {
    const index = mockRecipes.findIndex((r) => r.recipe_id === recipe_id);
    return index !== -1 ? Promise.resolve(mockRecipes.splice(index, 1)[0]) : Promise.resolve(null);
};

// ========================
// Comment Service
// ========================
let mockComments = [
    { comment_id: 101, recipe_id: 1, user_id: 1, text: "Loved this recipe! It was so easy and delicious.", date: "2024-01-01" },
    { comment_id: 102, recipe_id: 1, user_id: 2, text: "I added extra cheese, and it was amazing!", date: "2024-01-02" },
    { comment_id: 201, recipe_id: 2, user_id: 3, text: "Great for a quick breakfast! I like adding chili flakes for a kick.", date: "2024-02-10" },
    { comment_id: 202, recipe_id: 2, user_id: 4, text: "Simple and delicious. Perfect for busy mornings.", date: "2024-02-11" },
    { comment_id: 301, recipe_id: 3, user_id: 5, text: "These cookies are my favorite! Crispy on the outside, chewy inside.", date: "2024-03-15" },
    { comment_id: 302, recipe_id: 3, user_id: 6, text: "I used dark chocolate chips, and they turned out perfect!", date: "2024-03-16" }
];


export const getCommentsByRecipeId = (recipe_id) => {
    const user = getUserData();
    if (!user) return Promise.resolve([]); // Return empty if not logged in
    return Promise.resolve(mockComments.filter((c) => c.recipe_id === recipe_id));
};

export const addComment = (recipe_id, user_id, text) => {
    if (!isLoggedIn()) {
        return Promise.reject("You must be logged in to comment.");
    }
    const newComment = {
        comment_id: mockComments.length + 1,
        recipe_id,
        user_id,
        text,
        date: new Date().toISOString().split("T")[0],
    };
    mockComments.push(newComment);
    return Promise.resolve(newComment);
};

export const deleteCommentById = (comment_id) => {
    mockComments = mockComments.filter((comment) => comment.comment_id !== comment_id);
    return Promise.resolve({ success: true });
};

export const editCommentById = (comment_id, newContent) => {
    const comment = mockComments.find((c) => c.comment_id === comment_id);
    if (comment) {
        comment.content = newContent;
        return Promise.resolve(comment);
    }
    return Promise.reject("Comment not found");
};

// ========================
// Favorites Service
// ========================

let mockFavorites = [
    { favorite_id: 1, recipe_id: 1, user_id: 1 },
    { favorite_id: 2, recipe_id: 1, user_id: 2 },
    { favorite_id: 3, recipe_id: 2, user_id: 3 },
    { favorite_id: 4, recipe_id: 2, user_id: 4 },
    { favorite_id: 5, recipe_id: 3, user_id: 5 },
    { favorite_id: 6, recipe_id: 3, user_id: 6 },
    { favorite_id: 7, recipe_id: 3, user_id: 2 }
];



export const getFavoritesByUserId = (user_id) => Promise.resolve(mockFavorites.filter((fav) => fav.user_id === user_id));

export const addFavorite = (user_id, recipe_id) => {
    if (mockFavorites.some((fav) => fav.user_id === user_id && fav.recipe_id === recipe_id)) {
        return Promise.reject("Recipe is already favorited by this user.");
    }
    const newFavorite = { favorite_id: mockFavorites.length + 1, user_id, recipe_id };
    mockFavorites.push(newFavorite);
    return Promise.resolve(newFavorite);
};

export const removeFavorite = (user_id, recipe_id) => {
    mockFavorites = mockFavorites.filter((fav) => !(fav.user_id === user_id && fav.recipe_id === recipe_id));
    return Promise.resolve({ success: true });
};


