// controllers/tireControllers.js
const Tire = require('../model/tire'); // Update the path as needed
const TireSale = require('../model/TireSale');
const User = require('../model/User');

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

      // Sorting logic
      let sort = {};
      if (req.query.sortBy) {
          const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
          sort[req.query.sortBy] = sortOrder;

          // If sorting by price, add a secondary sort criteria
          if (req.query.sortBy === 'price') {
              sort['_id'] = 1; // Replace '_id' with 'createdAt' if you have a timestamp
          }
      }

      const tires = await Tire.find(query).sort(sort);
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
  console.log(req.body); 
  try {
    const tireId = req.params.id;
    const { status, username } = req.body; // Change from userId to username
    
    // First update the tire status
    const updatedTire = await Tire.findByIdAndUpdate(tireId, { status }, { new: true });
    if (!updatedTire) {
      return res.status(404).send('Tire not found');
    }

    // If the status is 'sold', create a new TireSale record
    if (status === 'sold') {
      // Find the user by username
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).send('User not found');
      }

      const newSale = new TireSale({
        tireId: tireId,
        userId: user._id, // Save the user's ObjectId
        username: user.username, 
        size: updatedTire.size,
        soldPrice: updatedTire.price,
        soldDate: new Date()
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

//------------------------------------
exports.markTireAsNotSold = async (req, res) => {
  try {
    const tireId = req.params.id;

    // Remove the TireSale record
    await TireSale.findOneAndDelete({ tireId: tireId });

    // Update the tire status back to available (or your preferred status)
    await Tire.findByIdAndUpdate(tireId, { status: 'available' });

    res.status(200).json({ message: 'Tire marked as not sold and sale record removed.' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = exports;
