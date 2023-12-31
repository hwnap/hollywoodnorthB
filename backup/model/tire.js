const mongoose = require('mongoose');

const tireSchema = new mongoose.Schema({
  brand: String,
  size: String,
  treadCondition: String,
  status: { type: String, enum: ['posted', 'not posted', 'sold', 'not sold'] },
  imageUrl: String // Changed from imageBase64 to imageUrl
});

module.exports = mongoose.model('Tire', tireSchema);
