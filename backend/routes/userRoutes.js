const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener todos los usuarios
router.get('/todos', async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear un usuario
router.post('/crear', async (req, res) => {
  try {
    const { nombre, edad, intereses } = req.body;
    const nuevoUsuario = new User({ nombre, edad, intereses });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

module.exports = router;
