import { Account } from "../../models/account.js";

export const buildRichAccount = async (accountDoc) => { 
  let accountIds = accountDoc.remainingPaychecks.map((paycheck) => paycheck.candidate);
  accountIds.push(...accountDoc.paymentRecords.map((paymentRecord) => paymentRecord.to));
  accountIds = [...new Set(accountIds)]; // Remove duplicates
  const accounts = await Account.find({ _id: { $in: accountIds } }).select('_id name avatar').lean();
  return ({
    ...accountDoc,
    remainingPaychecks: accountDoc.remainingPaychecks.map((paycheck) => ({
      ...paycheck,
      candidate: accounts.find((account) => account._id.toString() === paycheck.candidate.toString()),
    })),
    paymentRecords: accountDoc.paymentRecords.map((paymentRecord) => ({
      ...paymentRecord,
      date: paymentRecord.date.toLocaleDateString("en-US"),
      to: accounts.find((account) => account._id.toString() === paymentRecord.to.toString()),
    })),
  });
};