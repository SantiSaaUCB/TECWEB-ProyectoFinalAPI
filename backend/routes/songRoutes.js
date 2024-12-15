const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, artist, album } = req.body;
    try {
        const newSong = new Song({ name, artist, album });
        await newSong.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: "Error al agregar la canción" });
    }
});

router.put('/:name', async (req, res) => {
    const { name } = req.params;
    const { artist, album } = req.body;
    try {
        const updatedSong = await Song.findOneAndUpdate({ name }, { artist, album }, { new: true });
        if (!updatedSong) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        res.json(updatedSong);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar la canción" });
    }
});

router.delete('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const deletedSong = await Song.findOneAndDelete({ name });
        if (!deletedSong) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        res.json({ message: 'Canción eliminada' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar la canción' });
    }
});

module.exports = router;