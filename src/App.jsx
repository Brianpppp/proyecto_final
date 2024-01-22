import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./components/Home";
import Login from "./components/Login";
const App = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargaInicial, setCargaInicial] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      try {
        setCargaInicial(false);
        const { email } = usuarioFirebase || {};
        setUsuario(email);
      } catch (error) {
        console.error('Error durante la autenticación:', error);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {cargaInicial ? (
        <p>Cargando...</p>
      ) : usuario ? (
        <Home correoUsuario={usuario} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;


