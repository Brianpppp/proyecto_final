// service.js

// Objeto que contiene los valores de las claves de la API de Edamam
const queryStrings = {
    app_id: '8f320eea',
    app_key: '55136a7084cb4d72362f1d05336b5c02'
};

// Función para obtener datos de recetas basadas en una consulta de búsqueda
export const fetchData = async (defaultQuery) => {
    const { app_id, app_key } = queryStrings;
    try {
        // Realiza una solicitud GET a la API de Edamam utilizando la consulta de búsqueda y las claves de la API
        const data = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${defaultQuery}&app_id=${app_id}&app_key=${app_key}`);
        // Parsea la respuesta como JSON y la devuelve
        const response = await data.json();
        return response;
    } catch (e) {
        // Maneja los errores de la solicitud y los registra en la consola
        console.log(e, 'algo salió mal');
        return e;
    }
};

// Función para obtener detalles de una receta específica utilizando su identificador único
export const fetchTabData = async (defaultQuery) => {
    const { app_id, app_key } = queryStrings;
    try {
        // Realiza una solicitud GET a la API de Edamam utilizando el identificador de la receta y las claves de la API
        const data = await fetch(`https://api.edamam.com/api/recipes/v2/${defaultQuery}?type=public&app_id=${app_id}&app_key=${app_key}`);
        // Parsea la respuesta como JSON y la devuelve
        const response = await data.json();
        return response;
    } catch (e) {
        // Maneja los errores de la solicitud y los registra en la consola
        console.log(e, 'algo salió mal');
        return e;
    }
};
