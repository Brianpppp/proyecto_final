import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';


const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validación: Verificar que se haya ingresado un correo electrónico y una contraseña
    if (!email || !password) {
      setError('Por favor, ingresa un correo electrónico y una contraseña.');
      return;
    }

    try {
      setError(null);
      // Crear una nueva cuenta de usuario en Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirigir a la página de inicio después del registro exitoso
      navigate('/');
    } catch (error) {
      console.error(error.message);
      setError('Error durante el registro. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src="ruta_de_la_imagen.jpg" alt="Imagen de fondo" />
      </div>
      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="title">Registro</h2>
          {error && <p className="error">{error}</p>}
          <form className="form" onSubmit={handleRegistration}>
            <div className="input-container">
              <label htmlFor="email" className="label">Correo electrónico:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">Contraseña:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="button-container">
              <button type="submit">Registrarse</button>
            </div>
          </form>
          <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
