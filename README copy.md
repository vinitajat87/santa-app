# Santa Application

Welcome to the Santa Application! This is a simple Node.js web application that allows users to send their Christmas wishes to Santa Claus. The application collects user wishes, validates the input, and sends the wishes via email using Nodemailer.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Input:** Users can submit their wishes along with their user ID.
- **Input Validation:** Ensures user input is valid before submission.
- **Email Notifications:** Sends emails to Santa with the collected wishes.
- **Responsive Design:** User-friendly interface that works well on various devices.

## Technologies Used

- **Node.js:** JavaScript runtime for building the server.
- **Express.js:** Web framework for Node.js.
- **EJS:** Templating engine for rendering HTML pages.
- **Nodemailer:** Email sending library for Node.js.
- **Axios:** Promise-based HTTP client for making requests.
- **Moment.js:** Library for parsing, validating, and manipulating dates.

## Project Structure

Here's a brief overview of the project structure:

```
santa-app/
│
├── src/
│ ├── routes/
│ │ └── santa.js # Route handling for the Santa wishes
│ ├── services/
│ │ └── mailer/
│ │ ├── mailer.js # Email sending logic
│ │ └── mailTimer.js # Timer for sending pending wishes
│ ├── views/
│ │ ├── confirm.ejs # Confirmation view for successful wish submission
│ │ └── error.ejs # Error view for displaying errors
│ └── sharedData.js # Shared data, including pending wishes
│
├── public/
│ ├── css/ # Stylesheets
│ ├── img/ # Images
│ └── js/ # JavaScript files
│
├── .env # Environment variables
├── .gitignore # Files and directories to ignore in Git
├── package.json # Project metadata and dependencies
└── server.js # Entry point of the application
```

## Installation

Follow these steps to set up the project locally:

1. **Navigate to the project directory:**
   cd santa-app

2. **Install the dependencies:**
   npm install

3. **Create a .env file:**
   In the root of the project, create a file named .env and add the following environment variables:
   MAIL_USER=your_email@example.com
   MAIL_PASS=your_email_password
   MAIL_PORT=587
   MAIL_HOST=smtp.your_email_provider.com
   PORT=3000

4. **Run the application:**
   Start the server using the following command:
   npm start

5. **Access the application:**

Open your web browser and navigate to http://localhost:3000 to view the application.

6. **Submit your wish:**

Fill out the form with your User ID and your Christmas wish, then click the "Send" button to submit.
