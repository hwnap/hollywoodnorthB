const Tire = require("../models/tire");

// View all tires
exports.viewAllTires = async (req, res) => {
    try {
        const tires = await Tire.find();
        res.json(tires);
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
};

// Search for tires by size
exports.searchTiresBySize = async (req, res) => {
    try {
        const { size } = req.query;

        if (!size) {
            return res.status(400).json({ msg: "Tire size is required" });
        }

        // Check if the size matches the new format (e.g., 215/65R16)
        const tireSizePattern = /^\d{3}\/\d{2}R\d{2}$/;
        if (!tireSizePattern.test(size)) {
            return res.status(400).json({ msg: "Invalid tire size format. Please use the format '215/65R16'" });
        }

        const tires = await Tire.find({ size });
        res.json(tires);
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
};
