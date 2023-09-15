import mongoose from "mongoose";

export const uuidValidator = (req, res, next) => {
  if (req.params.uuid) {
    if (!mongoose.Types.ObjectId.isValid(req.params.uuid)) {
      res.status(400).json({ message: "Invalid uuid." });
      return;
    }
  } else {
    res.status(400).json({ message: "Missing uuid." });
    return;
  }
  next();
};

export const adminValidator = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Missing authorization token." });
    return;
  }
  if (req.headers.authorization !== config.systemInfo.adminToken) {
    res.status(401).json({ message: "Invalid authorization token." });
    return;
  }
  next();
 };