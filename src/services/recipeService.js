import axios from 'axios';

const API_URL = 'https://project3-30a71.web.app/api/recipes';

export const getAllRecipes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createRecipe = async (recipe) => {
    const response = await axios.post(API_URL, recipe);
    return response.data;
};