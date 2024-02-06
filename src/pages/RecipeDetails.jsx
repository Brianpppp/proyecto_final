import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../components/confing'; 
import Navbar from '../components/Navbar';

function RecipeDetails({ recipeId }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
          params: {
            apiKey: apiKey, // Recuerda reemplazar YOUR_API_KEY con tu clave de API
          },
        });
        setRecipeDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!recipeDetails) {
    return <p>No se encontraron detalles de la receta.</p>;
  }

  const { title, image, extendedIngredients, analyzedInstructions } = recipeDetails;

  return (
    <div>
        <Navbar/>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <h3>Ingredientes</h3>
      <ul>
        {extendedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instrucciones</h3>
      <ol>
        {analyzedInstructions[0].steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;

