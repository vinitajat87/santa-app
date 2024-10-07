const express = require("express");
const { pendingWishes } = require("../../sharedData.js");
const santaRouter = express.Router();
const { ERROR } = require("../constants.js");

// Import helper functions
const {
  searchUser,
  searchUserProfile,
  isUserIdAllSpaces,
  renderErrorScreen,
  renderConfirmScreen,
  getRegisteredUsersFromURL,
  getUserProfilesFromURL,
  isDateFormatValid,
  getAge,
} = require("../santaHelper.js");

// DEFINE ROUTES

/**
 * GET route to render the Santa page.
 */
santaRouter.get("", async (req, res) => {
  try {
    console.log("Rendering Santa page");
    res.render("santa");
  } catch (error) {
    console.error("Error rendering Santa page: ", error);
    renderErrorScreen(res, ERROR.internalError);
  }
});

/**
 * POST route to handle wishes submission.
 */
santaRouter.post("", async (req, res) => {
  try {
    // Extract username and wish from the request body
    const { username, wish } = req.body;
    console.log(`Processing wish for user: ${username}`);

    // Validate if username contains only spaces
    if (isUserIdAllSpaces(username)) {
      renderErrorScreen(res, ERROR.childNotRegistered);
      return;
    }

    // Fetch registered users
    const registeredUsersResponse = await getRegisteredUsersFromURL();
    const registeredUsers = registeredUsersResponse.data;

    // Search for the user in the registered users list
    const user = searchUser(registeredUsers, username);

    // If user is not found, render an error screen
    if (!user) {
      renderErrorScreen(res, ERROR.childNotRegistered);
      return;
    }

    const userId = user.uid;

    // Fetch user profiles
    const userProfilesResponse = await getUserProfilesFromURL();
    const userProfiles = userProfilesResponse.data;

    // Search for the user's profile based on userId
    const userProfile = searchUserProfile(userProfiles, userId);
    const { address, birthdate } = userProfile;

    // Validate birthdate format
    if (!isDateFormatValid(birthdate)) {
      renderErrorScreen(res, ERROR.invalidBirthDate);
      return;
    }

    // Check if the child's age is greater than 10
    const age = getAge(birthdate);
    if (age > 10) {
      renderErrorScreen(res, ERROR.childAgeMoreThanTen);
      return;
    }

    // Add the wish to the pendingWishes global array
    pendingWishes.push({ username, address, wish });

    // Render the confirmation screen
    renderConfirmScreen(res);
  } catch (error) {
    console.error("Error processing wish submission: ", error);
    renderErrorScreen(res, ERROR.internalError);
  }
});

module.exports = santaRouter;
