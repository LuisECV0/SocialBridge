import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion, crearUsuario } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [esRegistro, setEsRegistro] = useState(false); // Estado para alternar entre login y registro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError(''); // Limpiar mensajes de error

    if (!email || !password || (esRegistro && !username)) {
      setMensajeError('Todos los campos son obligatorios');
      return;
    }

    if (esRegistro) {
      // Registro de usuario
      const nuevoUsuario = await crearUsuario(username, email, password);
      if (nuevoUsuario) {
        alert('Cuenta creada exitosamente');
        setEsRegistro(false); // Volver a login
      } else {
        setMensajeError('Error al crear cuenta');
      }
    } else {
      // Inicio de sesión
      const response = await iniciarSesion(email, password);
      if (response.token) {
        localStorage.setItem('token', response.token); // Guardar token en localStorage
        alert('Inicio de sesión exitoso');
        navigate('/dashboard'); // Redirigir
      } else {
        setMensajeError('Correo o contraseña incorrectos');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '350px' }}>
        <h2 className="text-center">{esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>

        {mensajeError && <div className="alert alert-danger p-1 text-center">{mensajeError}</div>}

        <form onSubmit={handleSubmit}>
          {esRegistro && (
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónicoo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {esRegistro ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="mt-3 text-center">
          {esRegistro ? '¿Ya tienes una cuenta?' : '¿No tienes cuenta?'}
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setEsRegistro(!esRegistro)}
          >
            {esRegistro ? 'Iniciar sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
