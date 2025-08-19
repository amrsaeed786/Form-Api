import userFormSchema from "../models/userFormModel.js";
import transporter from "../middlewares/smtp2goMiddleware.js";

export const submitForm = async (req, res) => {
  try {
    const { yourName, yourEmail, subject, message } = req.body;

    // Validate required fields
    const requiredFields = { yourName, yourEmail, subject, message };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ message: `Please enter your ${key}` });
      }
    }

    // Save form data
    const formData = new userFormSchema(requiredFields);
    await formData.save();

    // Email content
    const mailOptions = {
      from: "info@techwpsolution.me",
      to: "hafizamirsaeed082@gmail.com",
      replyTo: yourEmail,
      subject: yourName,
      html: `
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; font-family: Arial, sans-serif; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td align="center" bgcolor="#4a90e2" style="padding: 20px;">
              <h2 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Form Submission</h2>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 0 20px 20px 20px; color: #333333; font-size: 16px; line-height: 1.6;">
              <table width="100%" cellpadding="10" cellspacing="0" border="0" style="border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #ddd;">
                  <td width="25%" style="font-weight: bold;">Name:</td>
                  <td>${yourName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                  <td width="25%" style="font-weight: bold;">Subject</td>
                  <td>${subject}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                  <td width="25%" style="font-weight: bold;">Email:</td>
                  <td>${yourEmail}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                  <td valign="top" width="25%" style="font-weight: bold;">Message:</td>
                  <td>${message}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 15px; background-color: #f9f9f9; color: #999999; font-size: 14px;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} TechWP Solution. All rights reserved.</p>
              <p style="margin: 5px 0 0 0;">Sent on: ${new Date().toLocaleString(
                "en-US",
                { dateStyle: "long", timeStyle: "short" }
              )}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Form submitted successfully",
      data: formData,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
