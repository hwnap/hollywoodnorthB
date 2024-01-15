const ClassicCar = require('../../model/ccimodel/classicCar');
const Category = require('../../model/ccimodel/category');
const File = require('../../model/ccimodel/file');

// exports.searchItems = async (req, res) => {
//     try {
//         const searchTerm = req.query.term;
        
//         // Search in Classic Cars
//         const cars = await ClassicCar.find({ name: { $regex: searchTerm, $options: 'i' } });

//         // Search in Categories
//         const categories = await Category.find({ name: { $regex: searchTerm, $options: 'i' } });

//         // Search in Files
//         const files = await File.find({ name: { $regex: searchTerm, $options: 'i' } });

//         res.json({
//             cars,
//             categories,
//             files
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// In your searchController.js

exports.searchItems = async (req, res) => {
    try {
        const searchTerm = req.query.term;

        // Search for Classic Cars with matching name
        const cars = await ClassicCar.find({ name: { $regex: searchTerm, $options: 'i' } });

        // Search for Categories with matching name
        const categories = await Category.find({ name: { $regex: searchTerm, $options: 'i' } });

        // Search for Files with matching name
        const files = await File.find({ name: { $regex: searchTerm, $options: 'i' } });

        // Create an array to store car details with associated categories and files
        const carDetails = [];

        // Iterate through the found cars
        for (const car of cars) {
            // Find categories associated with the car
            const carCategories = await Category.find({ classicCar: car._id });

            // Find files associated with each category
            const carFiles = await Promise.all(carCategories.map(async (category) => {
                return await File.find({ category: category._id });
            }));

            carDetails.push({
                car,
                categories: carCategories,
                files: carFiles.flat() // Flatten the array of files arrays
            });
        }

        res.status(200).json({
            cars: carDetails
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.combinedCarSearch = async (req, res) => {
    try {
        const searchTerm = req.query.term;

        // Search in Classic Cars
        const cars = await ClassicCar.find({ name: { $regex: searchTerm, $options: 'i' } });

        const carDetails = await Promise.all(cars.map(async (car) => {
            const categories = await Category.find({ classicCar: car._id });

            const files = await Promise.all(categories.map(async (category) => {
                return await File.find({ category: category._id, classicCar: car._id });
            }));

            return {
                car,
                categories,
                files: files.flat() // Flatten the array of files arrays
            };
        }));

        res.status(200).json(carDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchFiles = async (req, res) => {
    try {
        const searchTerm = req.query.term;

        // Search for files
        const files = await File.find({ name: { $regex: searchTerm, $options: 'i' } });

        res.json({
            files
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};