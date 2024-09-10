const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customError = require("../utils/customError");

// ============Controller for Sign-up/Register a new User===========
const register = async (req, res, next) => {
  console.log(req.body);

  const { email, password, repeatPassword } = req.body;

  if (!email) {
    // return res.status(400).json({ message: "Please provide an email address" });
    return next(customError("Please provide an email", 400));
  }

  if (!password) {
    // return res.status(400).json({ message: "Please provide a password" });
    return next(customError("Please provide a password", 400));
  }

  if (password !== repeatPassword) {
    // return res.status(400).json({ message: "Password dose not match" });
    return next(customError("Password does not match ", 400));
  }

  // bycrypt- for hashing and unhashing passwords
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ email, password: hashedPassword });
    return res.status(201).json({ message: "User Created" });
  } catch (error) {
    // console.log(error);
    // return res.status(500).json({ message: error });
    if (error.code === 11000 && error.keyValue.email) {
      console.log(error.code);
      console.log(error.keyValue.email);

      return next(customError("Email Already Exists", 401));
    }

    if (error.errors.email.message) {
      return next(customError(error.errors.email.message, 400));
    }

    next(customError("Something went wrong", 500));
  }
};

// ============Controller to Log-in an existing User==============
const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    // return res.status(400).json({ message: "Please provide an email address" });
    return next(customError("Please provide an email", 400));
  }

  if (!password) {
    // return res.status(400).json({ message: "Please provide a password" });
    return next(customError("Please provide a password", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(customError("User does not exists", 401));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return next(customError("Wrong Password", 400));
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, {
    expiresIn: "3d",
  });

  res.status(200).json({ message: "Login Successfully", token });
};

// ===========Controller to get users based token===============
const getUser = (req, res, next) => {
  const { userId } = req.user;
  res.status(200).json({ id: userId });
};

module.exports = { register, logIn, getUser };
