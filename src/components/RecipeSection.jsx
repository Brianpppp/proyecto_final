// RecipeSection.jsx
import axios from 'axios';
import '../styles/RecipeSection.css';
import React, { useState, useEffect } from 'react';

function RecipeSection({ category, apiKey, setSelectedRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              apiKey: apiKey,
              query: category,
            },
          }
        );
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    getRecipes();
  }, [category, apiKey]);

  return (
    <div>
      <h2>{category}</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="recipe-container">
          {recipes.slice(0, 6).map((recipe, index) => (
            <div
              className="recipe-card"
              key={index}
              onClick={() => setSelectedRecipe(recipe.id)} // Pasar solo el ID de la receta
            >
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeSection;


