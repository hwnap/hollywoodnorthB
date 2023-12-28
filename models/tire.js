const mongoose = require('mongoose');

const TireSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    size: { type: String, required: true },
    treadDepth: { type: Number, required: true },
    year: { type: Number, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    image: { type: String, required: false } // URL to the image
});

const Tire = mongoose.model('Tire', TireSchema);

module.exports = Tire;
