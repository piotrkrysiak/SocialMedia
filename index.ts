import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

if (process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL, {}, () =>
    console.log("Connected to MongoDB")
  );
}

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
