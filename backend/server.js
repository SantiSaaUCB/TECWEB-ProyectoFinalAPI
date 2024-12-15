require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const songRoutes = require('./routes/songRoutes');
const path = require('path');  // Importa path para gestionar rutas

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/songs', songRoutes);

// Serve static files (frontend) from the 'frontend' folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Catch-all route to serve the frontend HTML (in case of non-API requests)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
