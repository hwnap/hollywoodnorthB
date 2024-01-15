const mongoose = require('mongoose');
const User = require('./User');

const tireSaleSchema = new mongoose.Schema({
  tireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tire',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  username: String, 
  soldDate: Date,
  size: String,
  soldPrice: Number
});

module.exports = mongoose.model('TireSale', tireSaleSchema);
