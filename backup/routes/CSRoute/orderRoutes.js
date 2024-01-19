// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/CScontroller/orderController"); // Updated path

// Create a new order
router.post("/", orderController.createOrder);

router.get("/list-all", orderController.getAllOrders);

// Get details of a specific order by ID
router.get("/:orderId", orderController.getOrder);

// Update details of a specific order by ID
router.put("/:orderId", orderController.updateOrder);

// Delete a specific order by ID
router.delete("/:orderId", orderController.deleteOrder);

// Place specific routes before parameterized ones
router.get("/all", orderController.getAllOrders);

// Parameterized route for specific order by ID
router.get("/:id", orderController.getOrder); // If you have this or a similar route

module.exports = router;
