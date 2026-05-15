import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();

connectDb();

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});