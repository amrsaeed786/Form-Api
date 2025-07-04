import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit"; 
import connectDB from "../config/db.js";
import userFormRouter from "../routes/userFormRoute.js";

const app = express();

// Connect to DB (only once in serverless)
await connectDB();

// Middlewares
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet()); 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/users", userFormRouter);

// ✅ Export for Vercel
export default app;
