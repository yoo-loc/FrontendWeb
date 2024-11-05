// src/services/recipeService.js

// Mock data to simulate a database of recipes
let mockRecipes = [
    {
        recipe_id: 1,
        name: "Spaghetti Carbonara",
        type: "Main Course",
        description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        favorites_count: 10
    },
    {
        recipe_id: 2,
        name: "Chocolate Cake",
        type: "Dessert",
        description: "A rich, moist chocolate cake topped with creamy chocolate icing.",
        favorites_count: 25
    },
    {
        recipe_id: 3,
        name: "Caesar Salad",
        type: "Appetizer",
        description: "A fresh salad with romaine lettuce, croutons, and Caesar dressing.",
        favorites_count: 15
    }
];

// Function to get all recipes
export const getAllRecipes = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockRecipes);
        }, 500); // Simulate network delay
    });
};

// Function to get a recipe by ID
export const getRecipeById = (recipe_id) => {
    return new Promise((resolve) => {
        const recipe = mockRecipes.find((r) => r.recipe_id === recipe_id);
        setTimeout(() => {
            resolve(recipe || null); // Return null if recipe not found
        }, 500); // Simulate network delay
    });
};

// Function to add a new recipe
export const addRecipe = (newRecipe) => {
    return new Promise((resolve) => {
        const newRecipeWithId = {
            ...newRecipe,
            recipe_id: mockRecipes.length + 1,
            favorites_count: 0 // Initialize favorites count to 0
        };
        mockRecipes.push(newRecipeWithId);
        setTimeout(() => {
            resolve(newRecipeWithId);
        }, 500);
    });
};

// Function to update the favorites count of a recipe
export const updateFavoritesCount = (recipe_id, newCount) => {
    return new Promise((resolve) => {
        const recipeIndex = mockRecipes.findIndex((r) => r.recipe_id === recipe_id);
        if (recipeIndex !== -1) {
            mockRecipes[recipeIndex].favorites_count = newCount;
            setTimeout(() => {
                resolve(mockRecipes[recipeIndex]);
            }, 500);
        } else {
            resolve(null); // Return null if recipe not found
        }
    });
};
