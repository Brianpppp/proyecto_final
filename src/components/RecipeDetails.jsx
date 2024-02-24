import React, { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../services/Api'; // Asegúrate de que la ruta sea correcta según la ubicación de tu archivo api.js
import '../styles/RecipeDetails.css';
import { IoIosCloseCircle } from "react-icons/io";

function RecipeDetails({ recipeId, onClose }) {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipeDetails(recipeId);
        setRecipeDetails(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  if (loading) {
    return <p className="loading-message">Cargando...</p>;
  }

  if (!recipeDetails) {
    return <p className="no-recipe-details">No se encontraron detalles de la receta.</p>;
  }

  const { title, image, extendedIngredients, analyzedInstructions } = recipeDetails;

 
return (
    <div className="recipe-details-container">
      <button className="close-button" onClick={onClose}><IoIosCloseCircle size={40} /></button>
      <img src={image} alt={title} className="recipe-image" />
      <div className="recipe-content">
        <h2 className="recipe-title">{title}</h2>
        <div>
          <h3 className="ingredients-title">Ingredientes</h3>
          <ul className="ingredients-list">
            {extendedIngredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient.original}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="instructions-title">Instrucciones</h3>
          <ol className="instructions-list">
            {analyzedInstructions[0].steps.map((step, index) => (
              <li key={index} className="instruction-step">{step.step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
export default RecipeDetails;
