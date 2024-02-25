import axios from 'axios';
import { apiKey } from '../components/confing'

const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: apiKey,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};
export const fetchRecipeDetails = async (recipeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${recipeId}/information`, {
        params: {
          apiKey: apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      throw error; // Puedes lanzar el error para que el componente lo maneje si es necesario
    }
  }; 
  export const getMealPlan = async (timeFrame, targetCalories, diet, exclude) => {
    const MEAL_PLANNER_BASE_URL = 'https://api.spoonacular.com/mealplanner/generate';
  
    try {
      const response = await axios.get(MEAL_PLANNER_BASE_URL, {
        params: {
          timeFrame: timeFrame,
          targetCalories: targetCalories,
          diet: diet,
          exclude: exclude,
          apiKey: apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw error;
    }
  };
  export const fetchRandomRecipes = async (number, includeTags, excludeTags) => {
    try {
      const response = await axios.get(`${BASE_URL}/random`, {
        params: {
          apiKey: apiKey,
          number: number,
          includeTags: includeTags,
          excludeTags: excludeTags,
        },
      });
      return response.data.recipes;
    } catch (error) {
      console.error('Error fetching random recipes:', error);
      return [];
    }
  };

