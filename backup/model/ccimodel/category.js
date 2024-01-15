const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    classicCar: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassicCar', required: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
