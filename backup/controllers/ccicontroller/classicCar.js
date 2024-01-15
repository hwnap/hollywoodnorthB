const ClassicCar = require('../../model/ccimodel/classicCar');
const Category = require('../../model/ccimodel/category'); // Add this line
const File = require('../../model/ccimodel/file'); // Add this line

exports.getAllClassicCars = async (req, res) => {
    try {
        const cars = await ClassicCar.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClassicCarById = async (req, res) => {
    try {
        const car = await ClassicCar.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Classic car not found" });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createClassicCar = async (req, res) => {
    const newCar = new ClassicCar(req.body);
    try {
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateClassicCar = async (req, res) => {
    try {
        const updatedCar = await ClassicCar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ message: "Classic car not found" });
        }
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteClassicCar = async (req, res) => {
    try {
        const car = await ClassicCar.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Classic car not found" });
        }
        res.status(200).json({ message: "Classic car deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCarWithDetails = async (req, res) => {
    try {
        const car = await ClassicCar.findById(req.params.id).lean();
        if (!car) {
            return res.status(404).json({ message: "Classic car not found" });
        }

        const categories = await Category.find({ classicCar: car._id });
        const files = await File.find({ classicCar: car._id });

        res.status(200).json({
            car,
            categories,
            files
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};