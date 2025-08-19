import express from "express";
import { submitForm } from "../controllers/submitFormController.js";


//router object
const router = express.Router();

router.post("/submit-form", submitForm);

export default router;
