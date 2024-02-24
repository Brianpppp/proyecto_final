import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      
        navigate('/home');
      }
    });
    
    return () => unsubscribe();
  }, []); // El segundo argumento del useEffect está vacío para que se ejecute solo una vez al montar el componente

  const handleAuthentication = async (e) => {
    e.preventDefault();

   
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
      <h2 className="title">Iniciar sesión</h2>
      {error && <p className="error">{error}</p>}
      <form className="form" onSubmit={handleAuthentication}>
        <div className="input-container">
          <label htmlFor="email" className="label">Correo electrónico:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="label">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="button-container">
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
      <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>.</p>
    </div>
  );
};

export default Login;
