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
      replyTo: yourEmail, // 👈 add this line
      subject: subject,
      html: `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${yourName}</p>
    <p><strong>Email:</strong> ${yourEmail}</p>
    <p><strong>Message:</strong><br>${message}</p>
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
