const express = require('express');
const bcrypt = require('bcrypt');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfiledata } = require("../utils/validation");
const { getCookieOptions } = require("../utils/cookieOptions");

const profileRouter = express.Router();

// Get Profile Route - to fetch logged-in user's profile
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Edit Profile Route - to update logged-in user's profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    try {
        if(!validateEditProfiledata(req)){
            throw new Error("Invalid edit request!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.json({
            message: "Profile updated successfully!",
            user: loggedInUser,
        });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

// Change Password Route - secure password update for authenticated users
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new Error("Current password and new password are required.");
    }

    const user = req.user;
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send("ERROR : Current password is incorrect.");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// Delete Account Route - authenticated user can delete themselves
profileRouter.delete("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    await user.deleteOne();

    res.cookie(
      "token",
      null,
      getCookieOptions({
        expires: new Date(Date.now()),
      })
    );

    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;