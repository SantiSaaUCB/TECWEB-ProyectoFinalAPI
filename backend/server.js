require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const songRoutes = require('./routes/songRoutes');
const path = require('path');

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/songs', songRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/css', express.static(path.join(__dirname, '../frontend/css')));
app.use('/img', express.static(path.join(__dirname, '../frontend/css/img')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

app.get('/store', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/store.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
