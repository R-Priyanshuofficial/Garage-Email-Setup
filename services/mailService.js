import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
    if (!transporter) {
        console.log("🔧 Creating SMTP Transporter...");
        console.log("  Host:", process.env.SMTP_SERVER);
        console.log("  Port:", process.env.SMTP_PORT);
        console.log("  User:", process.env.BREVO_SMTP_USER);

        transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER,
            port: Number(process.env.SMTP_PORT) || 2525, // Default to 2525 (cloud-friendly port)
            secure: false, // Use STARTTLS instead of direct SSL
            requireTLS: true, // Require TLS encryption
            auth: {
                user: process.env.BREVO_SMTP_USER,
                pass: process.env.BREVO_SMTP_KEY,
            },
            connectionTimeout: 60000, // 60 seconds
            greetingTimeout: 30000,
            socketTimeout: 60000,
            tls: {
                rejectUnauthorized: false, // Accept self-signed certificates
                ciphers: 'SSLv3'
            }
        });

        // Verify connection
        transporter.verify((error, success) => {
            if (error) {
                console.error("❌ SMTP Connection Error:", error.message);
            } else {
                console.log("✅ SMTP Server is ready to send emails");
            }
        });
    }
    return transporter;
}

export async function sendMail({ to, subject, html }) {
    try {
        console.log(`📧 Attempting to send email to: ${to}`);
        
        const info = await getTransporter().sendMail({
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email Sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Email Send Error:", error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

// New function for sending emails with attachments
export async function sendMailWithAttachment({ to, subject, html, attachments }) {
    try {
        console.log(`📧 Attempting to send email with attachment to: ${to}`);
        
        const info = await getTransporter().sendMail({
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            to,
            subject,
            html,
            attachments, // Array of attachment objects: [{ filename: 'bill.pdf', content: buffer }]
        });

        console.log("✅ Email with attachment sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("❌ Email Send Error:", error.message);
        throw new Error(`Failed to send email with attachment: ${error.message}`);
    }
}
