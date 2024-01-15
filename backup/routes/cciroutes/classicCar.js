const express = require('express');
const router = express.Router();
const classicCarController = require('../../controllers/ccicontroller/classicCar');

// Get all classic cars
router.get('/', classicCarController.getAllClassicCars);

// Get a single classic car by ID
router.get('/:id', classicCarController.getClassicCarById);

// Create a new classic car
router.post('/', classicCarController.createClassicCar);

// Update a classic car by ID
router.put('/:id', classicCarController.updateClassicCar);

// Delete a classic car by ID
router.delete('/:id', classicCarController.deleteClassicCar);

router.get('/:id/details', classicCarController.getCarWithDetails);

module.exports = router;
