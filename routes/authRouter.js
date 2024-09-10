const express = require("express");
const { register, logIn, getUser } = require("../controllers/authController");
const methodNotAllowed = require("../utils/methodNotAllowed");
const auth = require("../middlewares/auth");

const router = express.Router();

// router.post("/register", register);

router.route("/register").post(register).all(methodNotAllowed);

// ================================

// router.post("/login", logIn);
router.route("/logIn").post(logIn).all(methodNotAllowed);

// =============================
router.route("/user").post(auth, getUser).all(methodNotAllowed);

module.exports = router;
