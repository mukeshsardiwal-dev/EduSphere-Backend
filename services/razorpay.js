import dotenv from "dotenv";
import Razorpay from "razorpay";

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