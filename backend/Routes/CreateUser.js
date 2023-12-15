const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET= "this is krishan kant sen"
// Route to create a new user
router.post(
  "/createuser",
  // Validate email format
  body("email", "Enter Correct Email").isEmail(),
  // Validate name length
  body("name", "Name Must contain 5 letters").isLength({ min: 5 }),
  // Validate password strength
  body(
    "password",
    "Password must be 8 digits long and should contain uppercase, lowercase, number, and symbol"
  ).isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  async (req, res) => {
    // Check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const salt = await bcrypt.genSalt(10);

    let secPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user using the provided data
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true , message: 'User created successfully Click to login' });
    } catch (err) {
      console.log("error", err);
      res.json({ success: false });
    }
  }
);

// Route to log in a user
router.post(
  "/loginuser",
  // Validate email format
  body("email", "Enter Correct Email").isEmail(),
  // Validate password strength
  body(
    "password",
    "Password must be 8 digits long and should contain uppercase, lowercase, number, and symbol"
  ).isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  async (req, res) => {
    // Check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Retrieve user data based on the provided email
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      // Check if user with provided email exists
      if (!userData) {
        return res.status(400).json({ errors: "Enter correct email" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      // Check if the provided password matches the stored password
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Enter correct password" });
      }
      //sending authorize token for never lost cart value or anything
      const data ={
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);
      const name=userData.name;
      return res.json({ success: true ,authToken:authToken,name:name});
    } catch (err) {
      console.log("error", err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
