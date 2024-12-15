require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Ruta a tu archivo db.js
const songRoutes = require('./routes/songRoutes');
const path = require('path');

const app = express();

// Conexión a la base de datos
connectDB();

// Middleware
app.use(cors()); // Para permitir solicitudes CORS
app.use(express.json()); // Para poder leer datos JSON en las solicitudes

// Rutas de la API
app.use('/api/songs', songRoutes);

// Servir archivos estáticos de la carpeta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas para las páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

app.get('/store', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/store.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
