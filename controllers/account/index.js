import express from "express";
import { adminValidator, uuidValidator } from '../../utils/middlewares.js';
import { Account } from "../../models/account.js";
import { buildRichAccount } from "./manager.js";

const router = express.Router();

const getpath = (path) => `/account${path}`;

router.get(getpath("/:accountId"), uuidValidator, async (req, res) => { 
  const accountId = req.params.accountId;
  try {
    const account = await Account.findById(accountId).lean();
    if (!account) {
      res.status(404).json(new ErrorResponse(1, "No account found."));
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
      const account = await Account.create(req.body);
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

router.delete(getpath("/delete/:accountId"), adminValidator, uuidValidator, async (req, res) => {
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

export default router;