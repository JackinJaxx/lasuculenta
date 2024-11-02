// apiConfig.js

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API_ENDPOINTS = {
  platillos: `${BASE_URL}${import.meta.env.VITE_PLATILLOS_ENDPOINT}`,
  bebidasCalientes: `${BASE_URL}${import.meta.env.VITE_BEBIDAS_CALIENTES_ENDPOINT}`,
  bebidasFrias: `${BASE_URL}${import.meta.env.VITE_BEBIDAS_FRIAS_ENDPOINT}`,
  desayunos: `${BASE_URL}${import.meta.env.VITE_DESAYUNOS_ENDPOINT}`,
  pasteleriaPanaderia: `${BASE_URL}${import.meta.env.VITE_PASTELERIA_PANADERIA_ENDPOINT}`,
  // Agrega más endpoints según sea necesario
};

export default API_ENDPOINTS;
