// Import dotenv package and configure it
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route to app.js from auth router in route folder
const authRouter = require("./routes/authRouter");

const movieRouter = require("./routes/movieRouter");

const bookmarkRouter = require("./routes/bookmarkRouter");

// Import the error file from the middleware to the app.js
const error = require("./middlewares/error");

// Spins up a new express application
const app = express();

const port = 4000;

app.use(cors());

// A middleware that allows access to the request.body on all request (without this you cant test on postman)
app.use(express.json());

// Middleware for log-in and register authentication router
app.use("/api/auth", authRouter);

// middleware for movie router
app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

// Custom middleware for errors
app.use(error);

// Start listening on a given port and run the callback function when it does
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");

    await app.listen(port, () => {
      console.log(`server is running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};
start();

// iyiolaabby
// HSLtJ1RddxvfIVOr
// mongodb+srv://iyiolaabby:HSLtJ1RddxvfIVOr@cluster0.zqu0s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
