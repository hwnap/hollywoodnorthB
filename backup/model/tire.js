const mongoose = require('mongoose');

const tireSchema = new mongoose.Schema({
  brand: String,
  size: String,
  treadCondition: String,
  status: { type: String, enum: ['posted', 'not posted', 'sold', 'not sold'] },
  imageUrl: String ,// Changed from imageBase64 to imageUrl
  location: { type: String, enum: ['Toronto', 'Barrie', 'Sutton West'] }
});

module.exports = mongoose.model('Tire', tireSchema);
