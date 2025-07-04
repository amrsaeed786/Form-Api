import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit"; 
import connectDB from "../config/db.js";
import userFormRouter from "../routes/userFormRoute.js";

const app = express();

// Connect to DB if not connected already
connectDB(); // ✅ don't await at top-level

// Middleware
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet()); 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test root route (optional)
app.get("/", (req, res) => {
  res.send("API root is working ✅");
});

// Routes
app.use("/api/v1/users", userFormRouter);

export default app;
