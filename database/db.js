import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongoUri = process.env.DB ?? process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "Missing MongoDB connection string. Set env var DB (or MONGODB_URI) to a valid MongoDB URI."
      );
    }
    console.log(mongoUri)
    await mongoose.connect(mongoUri);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
