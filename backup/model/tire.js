const mongoose = require('mongoose');

const tireSchema = new mongoose.Schema({
  brand: String,
  size: String,
  treadCondition: String,
  status: { type: String, enum: ['posted', 'not posted', 'sold', 'not sold'] },
  imageBase64: String
});

module.exports = mongoose.model('Tire', tireSchema);
