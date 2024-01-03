const mongoose = require('mongoose');

const tireSchema = new mongoose.Schema({
  brand: String,
  size: String,
  treadCondition: { 
    type: String, 
    enum: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'] 
  },
  status: { 
    type: String, 
    enum: ['posted', 'not posted', 'sold', 'not sold'] 
  },
  imageUrls: [{ type: String }], // Updated to support multiple image URLs
  location: { 
    type: String, 
    enum: ['Toronto', 'Barrie', 'Sutton West'] 
  },
  setInfo: { 
    type: String, 
    enum: ['Set of 2', 'Set of 4'] 
  },
  season: { 
    type: String, 
    enum: ['All Season', 'Summer', 'Winter'] 
  },
  price: Number,
  notes: String,
});

module.exports = mongoose.model('Tire', tireSchema);
