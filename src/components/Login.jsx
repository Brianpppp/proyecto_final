// Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; // Importa el archivo CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuthentication = async (e, authFunction) => {
    e.preventDefault();
    try {
      setError(null);
      await authFunction(auth, email, password);
      // Redirigir a la página principal u otra página después de la autenticación exitosa
      navigate('/');
    } catch (error) {
      console.error(error.message);
      setError("Error durante la autenticación. Verifica tu correo y contraseña.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Iniciar Sesión o Registrarse</h2>
      <form className="form" onSubmit={(e) => handleAuthentication(e, signInWithEmailAndPassword)}>
        <label className="label">
          Correo Electrónico:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        </label>
        <label className="label">
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </label>
        <button type="submit" className="button">Iniciar Sesión</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;

