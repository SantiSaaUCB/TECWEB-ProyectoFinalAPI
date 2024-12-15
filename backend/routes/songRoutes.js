const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().lean();
    res.json(songs);
  } catch (err) {
    console.error('Error al obtener las canciones:', err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, artist, album } = req.body;

  if (!name || !artist || !album) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  const existingSong = await Song.findOne({ name });
  if (existingSong) {
    return res.status(400).json({ message: 'La canción ya existe' });
  }

  const newSong = new Song({ name, artist, album });

  try {
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (err) {
    console.error('Error al guardar la canción:', err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/:name', async (req, res) => {
  const { name } = req.params;
  const { artist, album } = req.body;

  if (!artist && !album) {
    return res.status(400).json({ message: 'Se debe proporcionar al menos un campo para actualizar' });
  }

  try {
    const updatedSong = await Song.findOneAndUpdate(
      { name },
      { artist, album },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: 'Canción no encontrada' });
    }

    res.json(updatedSong);
  } catch (err) {
    console.error('Error al actualizar la canción:', err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const deletedSong = await Song.findOneAndDelete({ name });
    if (!deletedSong) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json({ message: 'Canción eliminada' });
  } catch (err) {
    console.error('Error al eliminar la canción:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;