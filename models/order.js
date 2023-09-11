import mongoose from "mongoose";

export const PaycheckSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
    unique: true,
  },
  shouldPay: Number,
}, { _id: false });

export const OrderItemSchema = new mongoose.Schema({
  name: String,
  thumbnail: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ["ITEM", "TAX", "SERVICE_FEE", "DELIVERY_FEE"],
  },
  method: {
    type: String,
    enum: ["EQUAL", "RATIO", "MANUAL"],
  },
  price: Number,
  quantity: Number,
  taxed: Boolean,
  paychecks: [PaycheckSchema],
});

export const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["DEFAULT", "WALMART", "INTERNET", "ENERGY"],
  },
  candidates: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Account",
  },
  items: [OrderItemSchema],
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  paychecksTotal: {
    type: [PaycheckSchema],
    default: [],
  }
});

export const Order = mongoose.model("Order", OrderSchema);