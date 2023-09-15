import express from "express";
import { adminValidator, uuidValidator } from '../../utils/middlewares.js';
import { Account } from "../../models/account.js";
import { buildRichAccount } from "./manager.js";

const router = express.Router();

const getpath = (path) => `/account${path}`;

router.get(getpath("/list"), async (req, res) => { 
  try {
    const accounts = await Account.find().lean();
    const richAccounts = await Promise.all(accounts.map(buildRichAccount));
    res.status(200).json(richAccounts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get(getpath("/:accountId"), uuidValidator, async (req, res) => { 
  const accountId = req.params.accountId;
  try {
    const account = await Account.findById(accountId).lean();
    if (!account) {
      res.status(404).json({message: 'Account Not Found'});
      return;
    }
    const richAccount = await buildRichAccount(account);

    res.status(200).json(richAccount);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.post(getpath("/create"), async (req, res) => { 
  if (req.body) {
    try {
      let account = new Account(req.body);
      account = await account.save();
      res.status(200).json(account);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } else {
    res.status(400).json({ message: 'Missing request body' });
    return;
  }
});

router.delete(getpath("/:accountId"), adminValidator, uuidValidator, async (req, res) => {
  const accountId = req.params.accountId;
  try {
    await Account.findByIdAndDelete(accountId);
    res.status(200).json({ message: 'Success' });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.post(getpath("/claimPaied"), async (req, res) => { 
  if (req.body) {
    const { accountId, targetId } = req.body;
    try {
      const account = await Account.findById(accountId);
      if (!account) {
        res.status(404).json({ message: 'Account Not Found' });
        return;
      }
      // find target in remainingPaychecks, it should be there
      let found = false;
      let tbdIndex = -1;
      for (let index=0; index<account.remainingPaychecks.length; index++) {
        const paycheck = account.remainingPaychecks[index];
        if (paycheck.candidate.toString() === targetId.toString()) {
          // delete it
          tbdIndex = index;
          found = true;
          break;
        }
      }
      if (!found) { 
        res.status(404).json({ message: 'Target Not Found' });
        return;
      }
      // add Record to paymentRecords
      account.paymentRecords.push({
        amount: account.remainingPaychecks[tbdIndex].shouldPay,
        to: targetId,
      });
      account.remainingPaychecks.splice(tbdIndex, 1);
      let result = await account.save();
      res.status(200).json(result);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } else {
    res.status(400).json({ message: 'Missing request body' });
    return;
  }
});

export default router;