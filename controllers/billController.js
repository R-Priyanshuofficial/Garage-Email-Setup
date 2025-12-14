import { sendMailWithAttachment } from "../services/mailService.js";
import { generateBillEmail } from "../utils/emailTemplates.js";

export async function sendBillEmail(req, res) {
  try {
    console.log("🔵 sendBillEmail called");

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "PDF file is required" 
      });
    }

    // Get data from form fields
    const { customerEmail, customerName, billNumber, totalAmount } = req.body;

    // Validate required fields
    if (!customerEmail || !customerName) {
      return res.status(400).json({
        success: false,
        message: "customerEmail and customerName are required",
      });
    }

    console.log("📄 PDF File received:", req.file.originalname);
    console.log("📧 Customer Email:", customerEmail);
    console.log("👤 Customer Name:", customerName);

    // Generate professional email HTML
    const emailHtml = generateBillEmail(
      customerName,
      billNumber || null,
      totalAmount || null
    );

    // Prepare attachment
    const attachments = [
      {
        filename: req.file.originalname || "bill.pdf",
        content: req.file.buffer, // PDF file buffer from multer
      },
    ];

    console.log("📧 Sending email with PDF attachment...");

    // Send email with PDF attachment
    await sendMailWithAttachment({
      to: customerEmail,
      subject: "Service Completed - Your Bill",
      html: emailHtml,
      attachments: attachments,
    });

    console.log("✅ Bill email sent successfully");

    res.json({
      success: true,
      message: `Bill sent successfully to ${customerEmail}`,
    });
  } catch (error) {
    console.error("❌ sendBillEmail Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send bill email",
      error: error.message,
    });
  }
}
