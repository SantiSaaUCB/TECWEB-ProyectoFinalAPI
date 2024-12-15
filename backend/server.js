require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const songRoutes = require('./routes/songRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/songs', songRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});