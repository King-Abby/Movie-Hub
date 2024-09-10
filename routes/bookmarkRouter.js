const express = require("express");
const auth = require("../middlewares/auth");
const {
  allBookmarks,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

router.route("/bookmark").get(auth, allBookmarks).all(methodNotAllowed);

router.route("/add/:id").get(auth, addBookmark).all(methodNotAllowed);

router.route("/remove/:id").get(auth, removeBookmark).all(methodNotAllowed);

module.exports = router;
