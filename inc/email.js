import transporter from "../middlewares/gmailMiddleware.js"; // make sure this file exists

/**
 * Send email using Gmail SMTP
 * @param {Object} options
 * @param {string} options.from - Sender email
 * @param {string} options.to - Recipient email
 * @param {string} options.replyTo - Reply email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content of the email
 */
export const sendEmail = async ({ from, to, replyTo, subject, html }) => {
  try {
    const mailOptions = {
      from,
      to,
      replyTo,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully!");
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error("Email sending failed");
  }
};
