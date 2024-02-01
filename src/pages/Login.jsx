import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuthentication = async (e) => {
    e.preventDefault();

    // Validación: Verificar que se haya ingresado un correo electrónico y una contraseña
    if (!email || !password) {
      setError('Por favor, ingresa un correo electrónico y una contraseña.');
      return;
    }

    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      // Redirigir a la página principal u otra página después de la autenticación exitosa
      navigate('/home');
    } catch (error) {
      console.error(error.message);
      setError('Error durante la autenticación. Verifica tu correo y contraseña.');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Iniciar Sesión </h2>
      <form className="form" onSubmit={handleAuthentication}>
        <div className="input-container">
          <label>Correo Electrónico:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="button-container">
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
      <p className="title">
        ¿No tienes una cuenta? <Link to="/register">Registrarse</Link>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;

