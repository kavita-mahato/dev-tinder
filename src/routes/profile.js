const express = require('express');
const { userAuth } = require("../middlewares/auth");
const { validateEditProfiledata } = require("../utils/validation");

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

module.exports = profileRouter;