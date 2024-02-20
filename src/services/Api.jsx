import axios from 'axios';
import { apiKey } from '../components/confing'

const BASE_URL = 'https://api.spoonacular.com/recipes';

// Función para buscar recetas por consulta
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
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
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