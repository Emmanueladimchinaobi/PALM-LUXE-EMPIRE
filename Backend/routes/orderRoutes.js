const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const sendOrderEmail = require("../utils/sendOrderEmail");

// Create a new order
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);

        const savedOrder = await order.save();

        // Send email to store owner
        await sendOrderEmail(savedOrder);

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: savedOrder
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to place order."
        });
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders."
        });
    }
});

module.exports = router;