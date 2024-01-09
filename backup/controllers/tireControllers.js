// controllers/tireControllers.js
const Tire = require('../model/tire'); // Update the path as needed
const TireSale = require('../model/TireSale');

exports.getAllTires = async (req, res) => {
  try {
    const tires = await Tire.find({});
    res.json(tires);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addTire = async (req, res) => {
  try {
    const newTire = new Tire(req.body);
    await newTire.save();
    res.status(201).json(newTire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTire = async (req, res) => {
  try {
    const tireId = req.params.id;
    const updatedData = req.body;
    const updatedTire = await Tire.findByIdAndUpdate(tireId, updatedData, { new: true });
    if (!updatedTire) {
      return res.status(404).send('Tire not found');
    }
    res.status(200).json(updatedTire);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteTire = async (req, res) => {
  try {
    const tireId = req.params.id;
    await Tire.findByIdAndDelete(tireId);
    res.status(200).send('Tire deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.searchTires = async (req, res) => {
  try {
    const query = {};
    if (req.query.size) query.size = req.query.size;
    if (req.query.brand) query.brand = req.query.brand;
    // Add more query parameters as needed

    const tires = await Tire.find(query);
    res.json(tires);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Other functions you provided earlier
exports.findTiresBySize = async (req, res) => {
  try {
    const size = req.query.size;
    const tires = await Tire.find({ size });
    res.json(tires);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateTireStatus = async (req, res) => {
  try {
    const tireId = req.params.id;
    const update = { status: req.body.status };

    // First update the tire status
    const updatedTire = await Tire.findByIdAndUpdate(tireId, update, { new: true });
    if (!updatedTire) {
      return res.status(404).send('Tire not found');
    }

    // If the status is 'sold', create a new TireSale record
    if (req.body.status === 'sold') {
      update.soldDate = new Date();
      const newSale = new TireSale({
        tireId: tireId,
        size: updatedTire.size,
        soldPrice: updatedTire.price,
        soldDate: new Date() // Ensure the soldDate is set to the current date/time
      });
      await newSale.save();
    }

    res.json(updatedTire);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTireSizes = async (req, res) => {
  try {
    const sizes = await Tire.distinct("size");
    res.json(sizes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getTireBrands = async (req, res) => {
  try {
    const brands = await Tire.distinct("brand");
    res.json(brands);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


module.exports = exports;
