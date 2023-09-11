import { Account } from "../../models/account.js";

export const calculateTotalPaychecks = (order) => { 
  const result = {};
  order.items.forEach((item) => {
    item.paychecks.forEach((paycheck) => {
      if (result[paycheck.candidate]) {
        result[paycheck.candidate] += paycheck.shouldPay;
      } else {
        result[paycheck.candidate] = paycheck.shouldPay;
      }
    });
  });
  // round each cadidate value to 2 decimal places
  Object.keys(result).forEach((key) => {
    result[key] = Math.round(result[key] * 100) / 100;
  });
  // turn result object into array
  const totalPaychecks = Object.keys(result).map((key) => ({
    candidate: key,
    shouldPay: Math.round(result[key] * 100) / 100,
  }));
  return totalPaychecks;
}

export const buildRichOrder = async (orderDoc) => { 
  const candidates = await Account.find({ _id: { $in: orderDoc.candidates } }).select("_id name avatar").lean();
  const payer = await Account.findById(orderDoc.payer).select("_id name avatar").lean();
  return ({
    ...orderDoc,
    date: orderDoc.date.toLocaleDateString("en-US"),
    candidates: candidates,
    items: await Promise.all(orderDoc.items.map(async (item) => ({
      ...item,
      paychecks: item.paychecks.map((paycheck) => {
        const candidate = candidates.find((candidate) => candidate._id.toString() === paycheck.candidate.toString());
        return ({
          ...paycheck,
          candidate: candidate,
        });
      }),
    }))),
    payer: payer,
    paychecksTotal: orderDoc.paychecksTotal.map((paycheck) => {
      const candidate = candidates.find((candidate) => candidate._id.toString() === paycheck.candidate.toString());
      return ({
        ...paycheck,
        candidate: candidate,
      });
    }),
  });
}