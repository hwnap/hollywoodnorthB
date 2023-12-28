const express = require('express');
const router = express.Router();
const tireController = require('../controllers/tireController');

// POST request to add a new tire
router.post('/', tireController.addTire);

// GET request to retrieve all tires or filter based on query parameters
router.get('/', tireController.getTiresBySize);

// GET request to retrieve a single tire by id
router.get('/:id', tireController.getTireById);

// PUT request to update a tire by id
router.put('/:id', tireController.updateTire);

// DELETE request to delete a tire by id
router.delete('/:id', tireController.deleteTire);

module.exports = router;
