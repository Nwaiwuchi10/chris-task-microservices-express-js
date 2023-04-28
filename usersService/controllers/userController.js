const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = jwt.sign({ userId: user._id }, "secret");
    res.status(200).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    res.status(404).json({
      error: "Error while creating a user",
    });
  }
};
const loginUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.send(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.send(400).json("wrong password");
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send JWT to client-side

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(406).json({
      error: "Error while logging a user",
    });
  }
});
const findAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      error: "Error while fetching all Products",
    });
  }
});
module.exports = {
  registerUser,
  loginUser,
  findAllUsers,
};
