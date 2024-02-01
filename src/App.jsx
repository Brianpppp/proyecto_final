import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
       
        {/* Otras rutas según tus necesidades */}
      </Routes>
    </Router>
  );
};

export default App;
//testezy nombre app