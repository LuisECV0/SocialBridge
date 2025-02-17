const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Nombre de usuario
  email: { type: String, required: true, unique: true }, // Correo
  password: { type: String, required: true } // Contraseña (sin encriptar por ahora)
});

const User = mongoose.model('User', userSchema);
module.exports = User;
