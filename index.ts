import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL, {}, () =>
    console.log("Connected to MongoDB")
  );
}

const app = express();
const PORT = 8000;
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

