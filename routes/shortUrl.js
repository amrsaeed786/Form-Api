import express from "express";
import { redirectURL, shortURL } from "../controllers/shortUrlController.js";
const router = express.Router();

router.post("/short-url", shortURL);
router.get("/:shortCode", redirectURL);

export default router;
