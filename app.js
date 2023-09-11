import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";

export const app = express();

app.use(cors({
  origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "client", "dist")));

// Database test
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
    res.status(500).json(new ErrorResponse(-1, "Unable to connect to the database."));
    return;
  }
  next();
});

// Routes
import OrderRouter from "./controllers/order/index.js";
import AccountRouter from "./controllers/account/index.js";

app.use("/api", OrderRouter);
app.use("/api", AccountRouter);


// Error handling
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});