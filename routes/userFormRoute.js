import express from "express";
import { getFormData, submitForm } from "../controllers/submitFormController.js";


//router object
const router = express.Router();

router.post("/submit-form", submitForm);
router.get("/get-data", getFormData)

export default router;
