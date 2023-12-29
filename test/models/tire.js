const mongoose = require('mongoose');

const TireSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    size: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true }, // You can specify possible statuses
    image: { type: String, required: false } // URL to the image
});

const Tire = mongoose.model('Tire', TireSchema);

module.exports = Tire;
