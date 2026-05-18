import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

if (process.env.NODE_ENV !== "test") {
  connectDB();
}

const app = express();


app.use("/api/auth", authRoutes);

/**
 * Middleware
 */
app.use(cors({
  origin: "*",
}));

app.use(express.json());

/**
 * Routes
 */
app.use("/api/jobs", jobRoutes);

/**
 * 404 Handler
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

/**
 * Error Handler
 */
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
});

/**
 * IMPORTANT: EXPORT app for testing
 */
export default app;

/**
 * Start server ONLY if not in test mode
 */
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}