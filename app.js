import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';

export const app = express();

app.use(cors({
  origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "dist")));

// Database test
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
    res.status(500).json({ message: "Unable to connect to the database."});
    return;
  }
  next();
});

// Routes
import AccountRouter from "./controllers/account/index.js";
import OrderRouter from "./controllers/order/index.js";

app.use("/api", OrderRouter);
app.use("/api", AccountRouter);


// Error handling
app.use((req, res, next) => {
  res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), "dist", "index.html"));
});