const mongoose = require('mongoose');
const SongSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
});
module.exports = mongoose.model('Song', SongSchema);