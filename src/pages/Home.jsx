import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RecipeSearch from '../components/RecipeSearch';
import RecipeList from '../components/RecipeList';
import RecipeSection from '../components/RecipeSection'; // Importa tu componente de sección de recetas

function Home() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div>
      <Navbar />
      <RecipeSearch setRecipes={setRecipes} />
      <RecipeList recipes={recipes} />
      <RecipeSection category="Carnes" /> {/* Sección de recetas veganas */}
      <RecipeSection category="Pizza" /> {/* Sección de recetas de pescado */}
      <RecipeSection category="Pastas" /> {/* Sección de recetas de pescado */}
      <RecipeSection category="Pollos" /> {/* Sección de recetas de pescado */}
     
    </div>
  );
}

export default Home;
