import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Sanai3y",
};

// Utility function to send emails
const sendEmail = async (recipient, subject, htmlContent, category) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email: recipient }],
      subject: subject,
      html: htmlContent,
      category: category,
    });
    console.log(`${category} sent successfully`, response);
  } catch (error) {
    console.error(`Error sending ${category.toLowerCase()}:`, error);
    throw new Error(
      `Error sending ${category.toLowerCase()}: ${error.message}`
    );
  }
};

// Function to send verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );
  return sendEmail(
    email,
    "Sanai3y - Verify your email",
    htmlContent,
    "Email Verification"
  );
};

// Function to send a welcome email
export const sendWelcomeEmail = async (email, name) => {
  const htmlContent = WELCOME_EMAIL_TEMPLATE.replace(
    /\{firstName\}/g,
    name
  ).replace("{loginURL}", "http://localhost:3000/login");
  return sendEmail(email, "Welcome to Sanai3y!", htmlContent, "Welcome Email");
};

// Function to send password reset email
export const sendPasswordResetEmail = (email, resetURL) => {
  const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    "{resetURL}",
    resetURL
  );
  return sendEmail(
    email,
    "Sanai3y - Reset your password",
    htmlContent,
    "Password Reset"
  );
};

// Function to send password reset success email
export const sendResetSuccessEmail = async (email) => {
  const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE;
  return sendEmail(
    email,
    "Sanai3y - Password Reset Successful",
    htmlContent,
    "Password Reset"
  );
};
