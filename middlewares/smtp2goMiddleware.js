import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using SMTP2GO SMTP settings
const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 587,
  secure: false, // true for port 465, false for other ports like 587
  auth: {
    user: `${process.env.SMTP2GO_USERNAME}`, // usually your email address
    pass: `${process.env.SMTP2GO_PASSWORD}`, // your SMTP2GO password or API key
  },
});

export default transporter;
