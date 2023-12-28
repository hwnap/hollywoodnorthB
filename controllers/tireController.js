const Tire = require("../models/tire");

// Add a new tire
exports.addTire = async (req, res) => {
  try {
    const newTire = new Tire(req.body);
    const savedTire = await newTire.save();
    res.json(savedTire);
  } catch (err) {
    res.status(500).send("Server Error: " + err.message);
  }
};

// // Retrieve all tires based on the new tire size format
// exports.getTires = async (req, res) => {
//     try {
//         const { size } = req.query;

//         if (!size) {
//             return res.status(400).json({ msg: "Tire size is required" });
//         }

//         // Check if the size matches the new format (e.g., 215/65R16)
//         const tireSizePattern = /^\d{3}\/\d{2}R\d{2}$/;
//         if (!tireSizePattern.test(size)) {
//             return res.status(400).json({ msg: "Invalid tire size format. Please use the format '215/65R16'" });
//         }

//         const tires = await Tire.find({ size });
//         res.json(tires);
//     } catch (err) {
//         res.status(500).send("Server Error: " + err.message);
//     }
// };

        

// Retrieve a specific tire by ID
exports.getTireById = async (req, res) => {
  try {
    const tire = await Tire.findById(req.params.id);
    if (!tire) {
      return res.status(404).json({ msg: "Tire not found" });
    }
    res.json(tire);
  } catch (err) {
    res.status(500).send("Server Error: " + err.message);
  }
};

// Update a specific tire's data
exports.updateTire = async (req, res) => {
  try {
    const tire = await Tire.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tire) {
      return res.status(404).json({ msg: "Tire not found" });
    }
    res.json(tire);
  } catch (err) {
    res.status(500).send("Server Error: " + err.message);
  }
};

// Delete a tire
exports.deleteTire = async (req, res) => {
  try {
    const tire = await Tire.findByIdAndDelete(req.params.id);
    if (!tire) {
      return res.status(404).json({ msg: "Tire not found" });
    }
    res.json({ msg: "Tire removed" });
  } catch (err) {
    res.status(500).send("Server Error: " + err.message);
  }
};


// Retrieve all tires or filter based on a unified search query parameter
exports.viewTires = async (req, res) => {
    try {
      let query = {};
  
      if (req.query.search) {
        // Update the regular expression to allow both numbers and letters
        const searchRegex = new RegExp(req.query.search, 'i'); // Case-insensitive regex search
        query = {
          $or: [
            { brand: searchRegex }, // Include brand in the search
            { size: searchRegex }, // Match entire tire size string
            { treadDepth: !isNaN(req.query.search) ? parseFloat(req.query.search) : searchRegex },
            { year: !isNaN(req.query.search) ? parseInt(req.query.search) : searchRegex },
            { location: searchRegex },
            { price: !isNaN(req.query.search) ? parseFloat(req.query.search) : searchRegex },
            { condition: searchRegex },
            // Add any additional searchable fields here
          ],
        };
      }
  
      const tires = await Tire.find(query);
      res.json(tires);
    } catch (err) {
      res.status(500).send("Server Error: " + err.message);
    }
  };


  // Retrieve all tires based on the new tire size format
exports.getTiresBySize = async (req, res) => {
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