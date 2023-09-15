import express from 'express';
import { Order } from '../../models/order.js';
import { Account } from '../../models/account.js';
import { buildRichOrder, calculateTotalPaychecks } from './manager.js';
import mongoose from 'mongoose';
import { adminValidator, uuidValidator } from '../../utils/middlewares.js';

const router = express.Router();

const getPath = (path) => `/order${path}`;

/**
 * @route GET /order/list
 * @description Get abstract order list.
 * @returns {{
 *  orderId: mongoose.Schema.Types.ObjectId;
 *  date: string;
 *  type: "DEFAULT" | "WALMART" | "INTERNET" | "ENERGY";
 *  payer: string;
 * }[]} 200 - An array of abstract order info 
 */
router.get(getPath('/abslist'), async (req, res) => {
  try {
    const orders = await Order.find().sort('-date').lean();
    // build abstract order info with Promise all
    const abstractOrders = await Promise.all(orders.map(async (order) => {
      const payer = await Account.findById(order.payer).lean();
      return {
        orderId: order._id,
        date: order.date.toLocaleDateString("en-US"),
        type: order.type,
        payer: payer.name,
      };
    }));
    res.status(200).json(abstractOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(getPath('/list'), async (req, res) => {
  try {
    const orders = await Order.find().sort('-date').lean();
    const richOrders = await Promise.all(orders.map(buildRichOrder));
    res.status(200).json(richOrders);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

/**
 * @route POST /order/create
 * @description Create an order.
 */
router.post(getPath('/create'), async (req, res) => {
  if (req.body) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const newOrder = new Order(req.body);
      // calculate paychecksTotal
      const paychecksTotal = calculateTotalPaychecks(newOrder);
      newOrder.paychecksTotal = paychecksTotal;
      await newOrder.save();

      // update account info associated with this order
      const candidates = await Account.find({ _id: { $in: newOrder.candidates } });
      const payerId = newOrder.payer;
      for (let candidate of candidates) {
        if (candidate._id.toString() === payerId.toString()) {
          continue;
        }
        // find total paycheck for this candidate
        const totalPaycheck = paychecksTotal.find((paycheck) => paycheck.candidate.toString() === candidate._id.toString());
        // update candidate's remainingPaychecks
        let found = false;
        for (let paycheck of candidate.remainingPaychecks) {
          if (paycheck.candidate.toString() === payerId.toString()) {
            paycheck.shouldPay += totalPaycheck.shouldPay;
            found = true;
            break;
          }
        }
        if (!found) {
          candidate.remainingPaychecks.push({
            candidate: payerId,
            shouldPay: totalPaycheck.shouldPay,
          });
        }
      }
      // update payer's remainingPaychecks
      await Promise.all(candidates.map((candidate) => candidate.save()));

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      res.status(500).json(err);
      return;
    }
    session.endSession();
    res.status(200).json({ message: 'Success' });
    return;
  } else {
    res.status(400).json({ message: 'Missing request body' });
    return;
  }
});

router.get(getPath('/:orderId'), uuidValidator, async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = Order.findById(orderId).lean();
    if (!order) {
      res.status(404).json({ message: 'Order Not Found' });
      return;
    }
    const richOrder = await buildRichOrder(order);

    res.status(200).json(richOrder);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.delete(getPath('/:orderId'), adminValidator, uuidValidator, async (req, res) => {
  const orderId = req.params.orderId;
  try {
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Success' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

export default router;
