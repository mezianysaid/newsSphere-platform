const {
  sendContactEmail,
  sendConfirmationEmail,
} = require("../utils/emailService");

/**
 * Handle contact form submission
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const handleContactForm = async (req, res) => {
  console.log("handleContactForm", req.body);
  try {
    const { name, email, subject, message } = req.body;

    // Validate form data
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Send email to company
    await sendContactEmail({ name, email, subject, message });

    // Send confirmation email to user
    await sendConfirmationEmail({ name, email, subject });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

module.exports = {
  handleContactForm,
};
