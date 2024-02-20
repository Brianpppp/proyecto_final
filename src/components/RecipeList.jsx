import React from 'react';
import '../styles/RecipeList.css';

function RecipeList({ recipes, setSelectedRecipe }) {
  return (
    <div className="recipe-list-container">
      <ul className="recipe-list">
        {recipes.map((recipe, index) => (
          <li key={index} onClick={() => setSelectedRecipe(recipe.id)}> {/* Pasar solo el ID de la receta */}
            <div className="recipe-item">
              <img src={recipe.image} alt={recipe.title} />
              <div className="recipe-details">
                <h3>{recipe.title}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
