const nodemailer = require("nodemailer");
const { pendingWishes } = require("../../../sharedData.js");
require("dotenv").config(); // Load environment variables

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

/**
 * Creates the email header for the pending wishes notification email.
 *
 * @returns {Object} Message header object
 */
const createMessageHeader = () => ({
  from: "do_not_reply@northpole.com",
  to: "santa@northpole.com",
  subject: "Pending Wishes List!",
});

/**
 * Generates the text content of the email with all pending wishes.
 *
 * @returns {string} Formatted email text with pending wishes
 */
const createMessageText = () => {
  // Format each wish in a readable way
  const strWishes = pendingWishes
    .map((wish) =>
      Object.keys(wish)
        .map((key) => ` ${wish[key]}`)
        .join(",")
    )
    .join("\n");

  return `
    Dear Santa,

    You have the following pending wishes to be granted! Hurry!

    ${strWishes}
    `;
};

/**
 * Sends an email using nodemailer with the provided message object.
 *
 * @param {Object} msg - The message object containing email details
 * @returns {Promise} Result of sending the email
 */
const invokeSend = (msg) => {
  return transporter
    .sendMail(msg)
    .then((info) => {
      console.log(`Email sent: ${info.response}`);
    })
    .catch((error) => {
      console.error(`Error sending email: ${error}`);
    });
};

/**
 * Sends an email with the pending wishes list to Santa.
 * Constructs the message header and body, then sends it using nodemailer.
 */
const sendMessage = async () => {
  try {
    // Create the message header and body
    const messageHeader = createMessageHeader();
    const text = createMessageText();

    // Merge the header and text to form the complete message object
    const message = { ...messageHeader, text };

    // Send the email
    await invokeSend(message);
  } catch (error) {
    console.error("Error in sendMessage:", error);
  }
};

module.exports = { sendMessage };
