const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/ccicontroller/file');

// Get all files for a category
router.get('/:categoryId', fileController.getFilesForCategory);

// Create a new file
// Create a new file for a classic car and category
router.post('/:classicCarId/:categoryId', fileController.createFile);


// Update a file by ID
router.put('/:id', fileController.updateFile);

// Delete a file by ID
router.delete('/:id', fileController.deleteFile);

module.exports = router;
