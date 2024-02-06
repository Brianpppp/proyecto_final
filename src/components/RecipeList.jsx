import React from 'react';
import RecipeCard from './RecipeCard';
import '../styles/RecipeList.css';

function RecipeList({ recipes, setSelectedRecipe }) {
  return (
    <div className="recipe-list-container">
      <h2>Recetas:</h2>
      <ul className="recipe-list">
        {recipes.map((recipe, index) => (
          <li key={index} onClick={() => setSelectedRecipe(recipe.id)}> {/* Pasar solo el ID de la receta */}
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;