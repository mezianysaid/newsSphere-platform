const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER || "your-email@gmail.com",
    pass: process.env.SMTP_PASS || "your-app-password", // Use app password for Gmail
  },
});

/**
 * Send an email from the contact form
 * @param {Object} formData - The form data from the contact form
 * @returns {Promise} - A promise that resolves when the email is sent
 */
const sendContactEmail = async (formData) => {
  const { name, email, subject, message } = formData;

  // Email to the company
  const mailOptions = {
    from: process.env.SMTP_USER || "your-email@gmail.com",
    to: process.env.COMPANY_EMAIL || "zonshopstor@gmail.com",
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  // Send the email
  return transporter.sendMail(mailOptions);
};

/**
 * Send a confirmation email to the user
 * @param {Object} formData - The form data from the contact form
 * @returns {Promise} - A promise that resolves when the email is sent
 */
const sendConfirmationEmail = async (formData) => {
  const { name, email, subject } = formData;

  const mailOptions = {
    from: process.env.SMTP_USER || "your-email@gmail.com",
    to: email,
    subject: "Thank you for contacting us",
    html: `
      <h2>Thank you for contacting us, ${name}!</h2>
      <p>We have received your message with the subject: <strong>${subject}</strong></p>
      <p>Our team will review your message and get back to you as soon as possible.</p>
      <p>Best regards,<br>The ShopX Team</p>
    `,
  };

  // Send the confirmation email
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactEmail,
  sendConfirmationEmail,
};
