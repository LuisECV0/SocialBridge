import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { iniciarSesion, crearUsuario } from '../services/api';
import './login.css';  // Asegúrate de importar el archivo CSS

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !username)) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (isLogin) {
      const response = await iniciarSesion(email, password);
      if (response.success) {
        alert('Inicio de sesión exitoso');
        navigate('/dashboard');
      } else {
        alert('Correo o contraseña incorrectos');
      }
    } else {
      const response = await crearUsuario(username, email, password);
      if (response) {
        alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
        setIsLogin(true);
      } else {
        alert('Error al crear cuenta');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-container">
              <FaUser className="input-icon" />
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="input-container">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>

        <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
        </p>
      </div>
    </div>
  );
}

export default Login;
