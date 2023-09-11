import mongoose from "mongoose";

export const uuidValidator = (req, res, next) => {
  if (req.params.uuid) {
    if (!mongoose.Types.ObjectId.isValid(req.params.uuid)) {
      res.status(400).json(new ErrorResponse(1, "Invalid uuid"));
      return;
    }
  } else {
    res.status(400).json(new ErrorResponse(1, "No uuid found in request url."));
    return;
  }
  next();
};

export const adminValidator = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json(new ErrorResponse(1, "No authorization header found."));
    return;
  }
  if (req.headers.authorization !== config.systemInfo.adminToken) {
    res.status(401).json(new ErrorResponse(1, "Invalid authorization token."));
    return;
  }
  next();
 };