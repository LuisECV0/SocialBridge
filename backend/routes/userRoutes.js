const express = require('express');
const User = require('../models/User'); // Importa el modelo
const router = express.Router();

// Obtener todos los usuarios
router.get('/todos', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

  // Crear usuario (ahora con contraseña cifrada)
  router.post('/crear', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      // Cifrar contraseña antes de guardar en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);

      const nuevoUsuario = new User({ username, email, password: hashedPassword });
      await nuevoUsuario.save();
      
      res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
      console.error('Error en el servidor:', error);
      res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
  
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
  

module.exports = router;
