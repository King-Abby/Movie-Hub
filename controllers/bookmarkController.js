const Movie = require("../models/movies");
const customError = require("../utils/customError");

// ==============Controller to find all the bookmarked movies=================

const allBookmarks = async (req, res) => {
  const { userId } = req.userId;
  const bookmarks = await Movie.find({ bookmarkBy: userId });
  res.status(200).json({ data: bookmarks });
};

// ===============Controller to add a movie  to bookmark=============
const addBookmark = async (req, res) => {
  const { id } = req.params;

  const { userId } = req.user;

  const bookmarkedShows = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkBy: userId } }
  );

  if (!bookmarkedShows) {
    return next(customError(`NO movie with ID: ${id}`, 400));
  }

  res.status(200).json({ message: "Movie Bookmarked" });
};

// =================Controller to remove a movie from Bookmark====
const removeBookmark = async (req, res) => {
  const { id } = req.params;

  const { userId } = req.user;

  const bookmarkedShows = await Movie.findOneAndUpdate(
    { _id: id },
    { $pull: { bookmarkBy: userId } }
  );

  if (!bookmarkedShows) {
    return next(customError(`NO movie with ID: ${id}`, 400));
  }

  res.status(200).json({ message: "Bookmark Removed" });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
