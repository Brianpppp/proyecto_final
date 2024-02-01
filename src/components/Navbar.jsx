import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Usuario cerró sesión correctamente
        // Redirigir a la página de inicio o a donde desees
        navigate('/');
      })
      .catch((error) => {
        // Ocurrió un error durante el cierre de sesión
        console.error(error);
      });
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        {/* Agrega otros elementos del navbar según tus necesidades */}
        {auth.currentUser && (
          <li className="nav-item">
            <button className="logout-button" onClick={handleSignOut}>Cerrar sesión</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
