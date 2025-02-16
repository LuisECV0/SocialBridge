import axios from 'axios';

const API_URL = 'http://localhost:5000/usuarios';

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Crear un usuario
export const crearUsuario = async (usuario) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};
