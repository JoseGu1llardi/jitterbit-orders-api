const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// GET /order/list - Get all orders
router.get("/list", orderController.getAllOrders);

// POST /order - Create a new order
router.post("/", orderController.createOrder);

// GET /order/:id - Get order details by ID
router.get("/:id", orderController.getOrderById);

// PUT /order/:id - Update an existing order
router.put("/:id", orderController.updateOrder);

// DELETE /order/:id - Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
