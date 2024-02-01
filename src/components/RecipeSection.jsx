import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RecipeSection.css';

function RecipeSection({ category }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${category}`,
          {
            params: {
              app_id: '8f320eea',
              app_key: '55136a7084cb4d72362f1d05336b5c02',
            },
          }
        );
        const fetchedRecipes = response.data.hits.slice(0, 4); // Mostrar solo las primeras 4 recetas
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]); // Se ejecutará cada vez que la categoría cambie o al cargar la página inicialmente

  return (
    <div className="recipe-section">
      <h2>{category}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="recipe-cards">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>Ingredients: {recipe.recipe.ingredientLines.join(', ')}</p>
              <p>
                Instructions: {recipe.recipe.instructions ? (
                  <button onClick={() => window.open(recipe.recipe.url, '_blank')} className="instructions-button">View Instructions</button>
                ) : (
                  'Instructions available on external page. Click below to view'
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeSection;


