import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,             // ✅ Your Gmail address
    pass: process.env.Gmail_AppPswword,  // ✅ Your 16-character Gmail App Password
  },
});

// Optional: verify connection when app starts
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Gmail SMTP connection failed:", error);
  } else {
    console.log("✅ Gmail SMTP is ready to send emails");
  }
});

export default transporter;
