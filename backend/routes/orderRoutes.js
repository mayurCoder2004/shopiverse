// routes/orderRoutes.js
import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    const order = new Order({
      user: req.user._id, // ✅ get user from JWT middleware
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

export default router;