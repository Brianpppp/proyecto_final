import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeList from '../components/RecipeList'; // Importa el componente de la lista de recetas
import RecipeDetails from '../components/RecipeDetails';
import Navbar from '../components/Navbar';

function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const searchResults = location.state && location.state.searchResults ? location.state.searchResults : [];

  const [selectedRecipeId, setSelectedRecipeId] = useState(null); // Nuevo estado para el ID de la receta seleccionada

  // Función para manejar el clic en una receta y actualizar el estado con el ID de la receta seleccionada
  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
  };

  return (
    <div>
      <Navbar/>
      {/* Mostrar la lista de resultados de la búsqueda */}
      <RecipeList recipes={searchResults} setSelectedRecipe={handleSelectRecipe} />

      {/* Mostrar los detalles de la receta seleccionada si hay un ID seleccionado */}
      {selectedRecipeId && (
        <div className="overlay">
          <RecipeDetails recipeId={selectedRecipeId} onClose={() => setSelectedRecipeId(null)} /> {/* Modificado para cerrar los detalles */}
        </div>
      )}
    </div>
  );
}

export default SearchResultsPage;
