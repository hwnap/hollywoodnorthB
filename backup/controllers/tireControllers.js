const Tire = require('../../backup/model/tire');

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
    res.status(201).send(newTire);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.findTiresBySize = async (req, res) => {
    try {
      const size = req.query.size;
      const tires = await Tire.find({ size: size });
      res.json(tires);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  exports.searchTires = async (req, res) => {
    try {
      const query = {};
      if (req.query.size) {
        query.size = req.query.size;
      }
      if (req.query.brand) {
        query.brand = req.query.brand;
      }
  
      const tires = await Tire.find(query);
      res.json(tires);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  // Additional function to update the tire's status and remove the image if sold
exports.updateTireStatus = async (req, res) => {
    try {
      const tireId = req.params.id;
      const update = { status: req.body.status };
  
      if (req.body.status === 'sold') {
        update.imageBase64 = ''; // Remove the image for sold items
      }
  
      const updatedTire = await Tire.findByIdAndUpdate(tireId, update, { new: true });
      res.json(updatedTire);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };