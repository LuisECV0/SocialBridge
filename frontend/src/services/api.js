import axios from 'axios';

const API_URL = 'http://localhost:5000/usuarios';
// Iniciar Seccion
export const iniciarSesion = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: 'Error en el inicio de sesión' };
    }
  };
// Obtener usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Crear usuario
export const crearUsuario = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return null;
  }
};
