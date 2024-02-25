import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import RecipeSection from '../components/RecipeSection';
import RecipeDetails from '../components/RecipeDetails'; // Cambiamos el import al componente combinado
import { apiKey } from '../components/confing';
import '../styles/Home.css'; // Asegúrate de importar el CSS para el efecto de superposición
import Carrusel from '../components/Carrusel';
import RecipesRandom from '../components/RecipeRandom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Función para manejar la selección de una receta y mostrar los detalles
  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipe(recipeId);
  };

  // Función para cerrar los detalles de la receta
  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <Navbar />
      <div className="content">
        <Carrusel/>
        <h2>Recetas Populares</h2>
        <RecipesRandom number={6} setSelectedRecipe={handleSelectRecipe} />
        <RecipeSection category="Meats" apiKey={apiKey} setSelectedRecipe={handleSelectRecipe} />
        <RecipeSection category="Spanish" apiKey={apiKey} setSelectedRecipe={handleSelectRecipe} />
        <RecipeSection category="Vegetarian" apiKey={apiKey} setSelectedRecipe={handleSelectRecipe} />

        {selectedRecipe && (
          <div className="overlay">
            <RecipeDetails recipeId={selectedRecipe} onClose={handleCloseRecipeDetails} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;