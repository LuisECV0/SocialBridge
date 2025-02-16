const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
mongoose
  .connect('mongodb+srv://luiscv17119:bmJiO0ylSKfLU6BL@socialbridge-cluster.lbn37.mongodb.net/?retryWrites=true&w=majority&appName=socialbridge-cluster')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error en la conexión a MongoDB:', err));

// Rutas
app.use('/usuarios', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
