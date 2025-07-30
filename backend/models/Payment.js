const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  paymentMethod: String,
  paymentId: String, // from Razorpay/Stripe
  status: { type: String, default: 'initiated' }, // initiated, completed, failed
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);