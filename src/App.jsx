import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails'; // Importa el componente de detalles de la receta

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe-details/:recipeId" element={<RecipeDetails />} /> {/* Ruta para los detalles de la receta */}
       
        {/* Otras rutas según tus necesidades */}
      </Routes>
    </Router>
  );
};

export default App;
//testezy nombre app