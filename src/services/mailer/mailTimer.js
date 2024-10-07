const mailer = require("./mailer.js");
const TIME_INTERVAL = 15000; // 15 seconds

/**
 * Starts a timer that sends the pending wishes email to Santa at a regular interval.
 *
 * The function invokes `mailer.sendMessage()` every `TIME_INTERVAL` milliseconds.
 */
const start = () => {
  setInterval(() => {
    console.log("Sending pending wishes email...");
    mailer
      .sendMessage()
      .then(() => console.log("Pending wishes email sent successfully"))
      .catch((error) => console.error("Error sending email:", error));
  }, TIME_INTERVAL);
};

module.exports = { start };
