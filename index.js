import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";

dotenv.config();

const razorpayKeyId = process.env.Razorpay_Key || process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret =
  process.env.Razorpay_Secret || process.env.RAZORPAY_KEY_SECRET;

if (!razorpayKeyId || !razorpayKeySecret) {
  // Fail fast with a clear message (instead of Razorpay SDK throwing)
  throw new Error(
    "Missing Razorpay credentials. Set Razorpay_Key/Razorpay_Secret (or RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET) in environment variables."
  );
}

export const instance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

const app = express();

// using middlewares
app.use(express.json());
app.use(cors());

const port = Number(process.env.PORT) || 3000;

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/uploads", express.static("uploads"));

// importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

// using routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
