const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = require("../utils/jwtSecret");

// Middleware to authenticate user using JWT token
const userAuth = async (req, res, next) => {
  try {
    // Read the token from cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decodedObj = await jwt.verify(token, JWT_SECRET);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    req.user = user;
    next(); // to move to the req handler
  }
  catch (err) {
    res.status(401).send("Unauthorized : " + err.message);
  }
};

module.exports = {
  userAuth,
};