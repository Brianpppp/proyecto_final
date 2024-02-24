import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Registro';
import SearchResultsPage from './pages/SearchResultsPage';
import MealDiary from './pages/MealDiary';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search-results" element={<SearchResultsPage />} /> {/* Nueva ruta para la página de resultados de búsqueda */}
        <Route path='/mealdiary'element={<MealDiary/>}/>
      </Routes>
    </Router>
  );
};

export default App;
//testezy nombre app