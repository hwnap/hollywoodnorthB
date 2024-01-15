const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/ccicontroller/search');

router.get('/', searchController.searchItems);
router.get('/combinedCarSearch', searchController.combinedCarSearch); // New combined search
router.get('/files', searchController.searchFiles); // Add this line for file search


module.exports = router;
