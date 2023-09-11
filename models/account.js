import mongoose from "mongoose";
import { PaycheckSchema } from "./order.js";

export const PaymentRecord = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amount: Number,
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  }
}, { "_id": false });

export const AccountSchema = new mongoose.Schema({
  name: String,
  avatar: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  remainingPaychecks: {
    type: [PaycheckSchema],
    default: [],
  },
  paymentRecords: {
    type: [PaymentRecord],
    default: [],
  },

});

export const Account = mongoose.model("Account", AccountSchema);