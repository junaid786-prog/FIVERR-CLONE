const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "sellers",
    required: true,
  },

  orderedGig: {
    type: mongoose.Schema.ObjectId,
    ref: "gigs",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  DeliveredAt: String,
});
