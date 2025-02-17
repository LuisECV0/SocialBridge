import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion, crearUsuario } from '../services/api';

function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Alternar entre Login y Registro
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
      // Iniciar Sesión
      const response = await iniciarSesion(email, password);
      if (response.success) {
        alert('Inicio de sesión exitoso');
        navigate('/dashboard');
      } else {
        alert('Correo o contraseña incorrectos');
      }
    } else {
      // Registrar Usuario
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
    <div>
      <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
      </p>
    </div>
  );
}

export default Auth;
