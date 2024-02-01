import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/servicio'; // Cambio aquí

function Tabs({ searchTerm, setLoading }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData(searchTerm).then((response) => { // Cambio aquí
      setRecipes(response);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching recipes:', error);
      setLoading(false);
    });
  }, [searchTerm, setLoading]); // Agrega searchTerm como dependencia

  return (
    <div className="container">
      <h1 className='recipeHeading'>Search Results</h1>
      <div className='recipe_banner'>
        {recipes.map((recipe, index) => (
          <div key={index} className="left-col">
            <span className='badge'>{recipe?.cuisineType[0].toUpperCase()}</span>
            <h1>{recipe.label}</h1>
            <p><strong>Recipe by:</strong><small>{recipe.source}</small></p>
            <h3>Ingredients</h3>
            <div className='ingredients'>
              <ul>
                {recipe.ingredientLines.map((list, index) =>
                  (<li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{list}</span></li>)
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
