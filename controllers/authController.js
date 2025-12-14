import { generateOtp } from "../utils/generateOtp.js";
import { createOtp, verifyOtp } from "../services/otpService.js";
import { sendMail } from "../services/mailService.js";

export async function sendOtp(req, res) {
  try {
    console.log("🔵 sendOtp called");
    const { email } = req.body;
    console.log("📨 Email from request:", email);
    
    if (!email) return res.status(400).json({ message: "Email required" });

    const otp = generateOtp();
    console.log("🔢 OTP generated:", otp);
    
    const expireMin = Number(process.env.OTP_EXPIRE_MIN || 5);

    console.log("💾 Creating OTP in database...");
    await createOtp(email, otp, expireMin);
    console.log("✅ OTP saved to database");

    const html = `
      <h3>Your OTP Code</h3>
      <p><b>${otp}</b></p>
      <p>This OTP will expire in ${expireMin} minutes.</p>
    `;

    console.log("📧 Sending email...");
    await sendMail({
      to: email,
      subject: "Your OTP Code",
      html,
    });
    console.log("✅ Email sent successfully");

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ sendOtp Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function verifyOtpController(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email & OTP required" });

    const result = await verifyOtp(email, otp);

    if (!result.success)
      return res.status(400).json({ success: false, message: result.message });

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error("verifyOtp Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
