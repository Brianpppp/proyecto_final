// RecipeSearch.jsx

import React, { useState } from 'react';
import axios from 'axios';

function RecipeSearch({ setRecipes, apiKey }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: apiKey,
            query: query,
          },
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="recipe-search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      {loading && <p>Cargando...</p>}
    </div>
  );
}

export default RecipeSearch;

