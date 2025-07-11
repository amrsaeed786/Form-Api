import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import dotenv from "dotenv"; // Load environment variables from .env file
import connectDB from "../config/db.js"; // Import database connection function
import userFormRouter from "../routes/userFormRoute.js";
import shortUrl from "../routes/shortUrl.js";

const app = express();
dotenv.config({ silent: true });

// Connect to DB
connectDB(); // ✅ don't await at top-level

app.set("trust proxy", 1); // Trust first proxy for rate limiting

// Middleware
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors()); // Enable CORS for all routes
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
app.use("/", shortUrl);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// export default app;
