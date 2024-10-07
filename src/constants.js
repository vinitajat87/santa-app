// Constants for error messages and URLs used in the application

const ERROR = {
  childNotRegistered: "The user is not registered! Please register first.",
  childAgeMoreThanTen: "The user's age is greater than 10 years.",
  invalidBirthDate: "Invalid birthdate format.",
  internalError: "An internal error occurred. Please try again later.",
};

// URLs for external data sources
const URL_USERPROFILES =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";
const URL_USERS =
  "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";

// Exporting constants for use in other modules
module.exports = {
  ERROR,
  URL_USERPROFILES,
  URL_USERS,
};
