const express = require('express');
const tireController = require('../controllers/tireControllers');

const router = express.Router();

router.get('/', tireController.getAllTires);
// router.get('/search', tireController.findTiresBySize);
router.get('/search', tireController.searchTires);
router.put('/:id/status', tireController.updateTireStatus);
router.post('/', tireController.addTire);

module.exports = router;
