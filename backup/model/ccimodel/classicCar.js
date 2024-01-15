const mongoose = require('mongoose');

const classicCarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const ClassicCar = mongoose.model('ClassicCar', classicCarSchema);

module.exports = ClassicCar;
