const express = require("express");
const {
  allShows,
  allSeries,
  allMovies,
} = require("../controllers/movieController");
const methodNotAllowed = require("../utils/methodNotAllowed");

const router = express.Router();

router.route("/").get(allShows).all(methodNotAllowed);

router.route("/series").get(allSeries).all(methodNotAllowed);

router.route("/movies").get(allMovies).all(methodNotAllowed);

module.exports = router;
