// Home.jsx

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import RecipeSearch from '../components/RecipeSearch';
import RecipeList from '../components/RecipeList';
import RecipeSection from '../components/RecipeSection';
import RecipeDetails from './RecipeDetails'; // Cambiamos el import al componente combinado
import { apiKey } from '../components/confing';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Función para manejar la selección de una receta y mostrar los detalles
  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipe(recipeId);
  };

  // Renderizar los detalles de la receta si hay una receta seleccionada
  if (selectedRecipe) {
    return <RecipeDetails recipeId={selectedRecipe} />;
  }

  return (
    <div>
      <Navbar/>
      <RecipeSearch setRecipes={setRecipes} apiKey={apiKey} />
      <RecipeList recipes={recipes} setSelectedRecipe={handleSelectRecipe} />
      <RecipeSection category="Carnes" apiKey={apiKey} setSelectedRecipe={handleSelectRecipe} />
    </div>
  );
}

export default Home;

