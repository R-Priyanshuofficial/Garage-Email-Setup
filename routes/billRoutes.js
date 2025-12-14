import express from "express";
import upload from "../middleware/upload.js";
import { sendBillEmail } from "../controllers/billController.js";

const router = express.Router();

// POST /api/bills/send-bill - Send bill PDF via email
router.post("/send-bill", upload.single("pdfFile"), sendBillEmail);

export default router;
