const express = require("express");
const mailTimer = require("./src/services/mailer/mailTimer.js");

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));
app.use("/css", express.static(`${__dirname}/public/css`));
app.use("/img", express.static(`${__dirname}/public/img`));
app.use("/js", express.static(`${__dirname}/public/js`));

// Set up view engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Import and use routes
const santaRouter = require("./src/routes/santa");
app.use("/", santaRouter);

// Start the server and mail timer
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  mailTimer.start();
});
