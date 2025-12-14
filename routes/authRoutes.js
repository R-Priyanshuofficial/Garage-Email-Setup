import express from "express";
import { sendOtp, verifyOtpController } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtpController);

export default router;
