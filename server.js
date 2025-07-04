import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";


import connectdB from "./config/db.js";
import userFormRouter from "./routes/userFormRoute.js";

//rest object
const app = express();

//db
connectdB();

//rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

//middleware
app.use(limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/v1/users", userFormRouter);

//server
const PORT = process.env.PORT || 30000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
