import { useState, useEffect } from 'react';
import { obtenerUsuarios, crearUsuario } from './services/api';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [intereses, setIntereses] = useState('');

  // Cargar usuarios al inicio
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };
    cargarUsuarios();
  }, []);

  // Manejar la creación de usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoUsuario = { nombre, edad: Number(edad), intereses: intereses.split(',') };
      const usuarioCreado = await crearUsuario(nuevoUsuario);
      setUsuarios([...usuarios, usuarioCreado]); // Agregar nuevo usuario a la lista
      setNombre('');
      setEdad('');
      setIntereses('');
      alert('✅ Usuario creado con éxito');
    } catch (error) {
      alert('❌ Error al crear usuario');
    }
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>

      {/* Formulario para crear usuario */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} required />
        <input type="text" placeholder="Intereses (separados por coma)" value={intereses} onChange={(e) => setIntereses(e.target.value)} required />
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Lista de usuarios */}
      <h2>Usuarios Registrados</h2>
      <ul>
        {usuarios.map((user) => (
          <li key={user._id}>
            <strong>{user.nombre}</strong> ({user.edad} años) - Intereses: {user.intereses.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
