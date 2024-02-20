import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRecipes } from '../services/Api'; // Importa la función de búsqueda de recetas
import '../styles/RecipeSearch.css';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const searchResults = await searchRecipes(query); // Utiliza la función de búsqueda de recetas
      navigate(`/search-results?query=${encodeURIComponent(query)}`, { state: { searchResults } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="recipe-search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </div>
  );
}

export default RecipeSearch;
