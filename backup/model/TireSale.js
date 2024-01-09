// models/TireSale.js
const mongoose = require('mongoose');

const tireSaleSchema = new mongoose.Schema({
  tireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tire',
    required: true
  },
  soldDate: {
    type: Date,
    default: Date.now
  },
  size: String,
  soldPrice: Number
});

module.exports = mongoose.model('TireSale', tireSaleSchema);
