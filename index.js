import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./database/db.js";

dotenv.config();

const app = express();

// using middlewares
app.use(express.json());
app.use(cors());

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

const port = Number(process.env.PORT) || 3000;

// Vercel runs this file as a Serverless Function.
// In that environment you must NOT call app.listen().
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
  });
} else {
  // Ensure DB connection is established (cold start). The runtime may be reused.
  connectDb();
}

export default app;
