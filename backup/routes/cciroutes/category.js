const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/ccicontroller/category');

// Get all categories for a classic car
router.get('/:classicCarId', categoryController.getCategoriesForClassicCar);

// Create a new category
router.post('/', categoryController.createCategory);

// Update a category by ID
router.put('/:id', categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

router.post('/:classicCarId', categoryController.createCategory);

module.exports = router;
