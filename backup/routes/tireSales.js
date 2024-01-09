// routes/tireSaleAnalyticsRoutes.js
const express = require('express');
const tireSaleAnalyticsController = require('../controllers/tireSaleController');

const router = express.Router();

router.get('/weekly-sales', tireSaleAnalyticsController.getWeeklySales);
router.get('/monthly-sales', tireSaleAnalyticsController.getMonthlySales);
router.get('/total-sales', tireSaleAnalyticsController.getTotalSales);

module.exports = router;
