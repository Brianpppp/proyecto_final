import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario ya está autenticado
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Usuario inició sesión correctamente
        // Redirigir a la página de inicio
        navigate('/');
      })
      .catch((error) => {
        // Ocurrió un error durante el inicio de sesión
        console.error(error);
      });
  };

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
    <div>
      <h1>Home</h1>
      {auth.currentUser ? (
        <button onClick={handleSignOut}>Cerrar sesión</button>
      ) : (
        <button onClick={handleSignIn}>Iniciar sesión con Google</button>
      )}
    </div>
  );
}

export default Home;
