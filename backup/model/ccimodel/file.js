const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    notes: String,
    pictureLinks: [String],
    classicCar: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassicCar' }, // Reference to ClassicCar model
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Reference to Category model
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
