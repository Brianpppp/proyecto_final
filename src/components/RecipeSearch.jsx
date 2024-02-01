import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeSearch({ setRecipes }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const getRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.edamam.com/api/recipes/v2?type=public',                                                        
        {
          params: {
            app_id: '8f320eea',
            app_key: '55136a7084cb4d72362f1d05336b5c02',
            q: query
          },
        }
      );
      setRecipes(response.data.hits);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delay = 60000 / 10; // Límite de 10 solicitudes por minuto
    const timeout = setTimeout(() => {
      getRecipes();
    }, delay);
    return () => clearTimeout(timeout);
  }, [query]); // Se ejecuta cada vez que query cambia

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getRecipes();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>Buscar</button>
      </form>
      {loading && <p>Cargando...</p>}
    </div>
  );
}

export default RecipeSearch;
