import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login'; // Mantén el componente Login
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Redirigir al login como página principal */}
      <Route path="/login" element={<Login />} /> {/* Ruta para login */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta para el dashboard */}
    </Routes>
  );
}

export default App;
