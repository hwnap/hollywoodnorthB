const express = require('express');
const tireController = require('../controllers/tireControllers');

const router = express.Router();

router.get('/', tireController.getAllTires);
// router.get('/search', tireController.findTiresBySize);
router.get('/search', tireController.searchTires);
router.put('/:id/status', tireController.updateTireStatus);
router.post('/', tireController.addTire);
router.delete('/:id', tireController.deleteTire);
router.put('/:id', tireController.updateTire);
router.get('/sizes', tireController.getTireSizes);
router.get('/brands', tireController.getTireBrands);
router.put('/:id/not-sold', tireController.markTireAsNotSold);


module.exports = router;
