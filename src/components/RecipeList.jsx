import React from 'react';
import '../styles/RecipeList.css';

function RecipeList({ recipes }) {
  return (
    <div className="recipe-container">
      {recipes.map((recipe, index) => (
        <div className="recipe-item" key={index}>
          <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          <div className="recipe-details">
            <h3>{recipe.recipe.label}</h3>
            <p className="ingredients">{recipe.recipe.ingredientLines.join(', ')}</p>
            <p className="time">{recipe.recipe.totalTime} min</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
