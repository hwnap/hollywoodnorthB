const express = require('express');
const router = express.Router();
const tireController = require('../controllers/tireController');

// POST request to add a new tire (if needed)
// ...

// GET request to view all tires
router.get('/', tireController.viewAllTires);

// GET request to search for tires by size
router.get('/search', tireController.searchTiresBySize);

// PUT request to update a tire by id (if needed)
// ...

// DELETE request to delete a tire by id (if needed)
// ...

module.exports = router;
