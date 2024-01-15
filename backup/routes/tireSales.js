// routes/tireSales.js
const express = require("express");
const tireSaleAnalyticsController = require("../controllers/tireSaleController"); // Import the controller
const tireSaleController = require("../controllers/tireSaleController"); // Import the controller
const router = express.Router();

router.get("/weekly-sales", tireSaleAnalyticsController.getWeeklySales);
router.get("/monthly-sales", tireSaleAnalyticsController.getMonthlySales);
router.get("/total-sales", tireSaleAnalyticsController.getTotalSales);
router.get("/all-sales", tireSaleAnalyticsController.getAllSales);

// New routes for tireSaleController
router.get("/reports-by-date-range", tireSaleController.getReportsByDateRange);

module.exports = router;
