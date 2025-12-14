import  crypto from "crypto";
import Otp from "../models/Otp.js"

function hashOtp(otp) {
    return crypto.createHash("sha256").update(otp).digest("hex");
}

export async function createOtp(email , otp , expireMin) {
    const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + expireMin * 60 * 1000);

  await Otp.updateMany({ email, used: false }, { used: true });

  const otpDoc = new Otp({
    email,
    otpHash,
    expiresAt,
  });

  await otpDoc.save();
  return otpDoc;
}
export async function verifyOtp(email, otp) {
  const otpHash = hashOtp(otp);

  const doc = await Otp.findOne({ email, otpHash });

  if (!doc) return { success: false, message: "Invalid OTP" };
  if (doc.used) return { success: false, message: "OTP already used" };
  if (doc.expiresAt < new Date()) return { success: false, message: "OTP expired" };

  doc.used = true;
  await doc.save();

  return { success: true };
}