const moment = require("moment");
const axios = require("axios");
const { URL_USERPROFILES, URL_USERS } = require("./constants.js");

// DEFINE HELPERS

/**
 * Searches an array for an object with a specified field matching the search parameter.
 * @param {Array} arr - The array to search through.
 * @param {string} searchParam - The value to search for.
 * @param {string} field - The object field to match against the search parameter.
 * @returns {Object|null} - The found object or null if not found.
 */
const search = (arr, searchParam, field) =>
  arr.find((e) => e[field] === searchParam);

/**
 * Searches for a user in the array based on user ID.
 * @param {Array} arr - The array of users.
 * @param {string} userid - The user ID to search for.
 * @returns {Object|null} - The found user object or null if not found.
 */
const searchUser = (arr, userid) => search(arr, userid, "uid");

/**
 * Searches for a user profile based on user UID.
 * @param {Array} arr - The array of user profiles.
 * @param {string} userid - The user UID to search for.
 * @returns {Object|null} - The found user profile or null if not found.
 */
const searchUserProfile = (arr, userid) => search(arr, userid, "userUid");

/**
 * Checks if a string is empty or contains only whitespace characters.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is empty or only whitespace; otherwise false.
 */
const isStringAllSpaces = (str) => !str.trim().length;

/**
 * Checks if a user ID string is empty or contains only whitespace characters.
 * @param {string} str - The user ID string to check.
 * @returns {boolean} - True if the user ID is empty or only whitespace; otherwise false.
 */
const isUserIdAllSpaces = (str) => isStringAllSpaces(str);

/**
 * Renders a specified screen with an optional error message.
 * @param {Object} res - The response object.
 * @param {string} screen - The screen to render.
 * @param {string|null} error - The error message to display (optional).
 */
const renderScreen = (res, screen, error) => res.render(screen, { error });

/**
 * Renders the error screen with a specific error message.
 * @param {Object} res - The response object.
 * @param {string} error - The error message to display.
 */
const renderErrorScreen = (res, error) => renderScreen(res, "error", error);

/**
 * Renders the confirmation screen without errors.
 * @param {Object} res - The response object.
 */
const renderConfirmScreen = (res) => renderScreen(res, "confirm");

/**
 * Fetches registered users from the specified URL.
 * @returns {Promise<Object>} - The response data from the URL.
 */
const getRegisteredUsersFromURL = async () => await axios.get(URL_USERS);

/**
 * Fetches user profiles from the specified URL.
 * @returns {Promise<Object>} - The response data from the URL.
 */
const getUserProfilesFromURL = async () => await axios.get(URL_USERPROFILES);

/**
 * Validates the format of a date string.
 * @param {string} date - The date string to validate.
 * @returns {boolean} - True if the date format is valid; otherwise false.
 */
const isDateFormatValid = (date) => moment(date, "YYYY/MM/DD", true).isValid();

/**
 * Calculates the age based on the given birthday.
 * @param {string|Date} birthday - The birthday to calculate age from.
 * @returns {number} - The calculated age in years.
 */
const getAge = (birthday) =>
  new Date(new Date() - new Date(birthday)).getFullYear() - 1970;
// Alternatively, using moment.js:
// const getAge = birthday => moment().diff(moment(birthday), 'years');

module.exports = {
  search,
  searchUser,
  searchUserProfile,
  isStringAllSpaces,
  isUserIdAllSpaces,
  renderScreen,
  renderErrorScreen,
  renderConfirmScreen,
  getRegisteredUsersFromURL,
  getUserProfilesFromURL,
  isDateFormatValid,
  getAge,
};
