import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    email: {type: String , required: true},
    otpHash: {type: String , required: true},
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
    