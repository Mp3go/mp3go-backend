const express = require("express");
const mongoose = require("mongoose");
// const path = require("path");
const authRoutes = require("./routes/auth");
const albumRoutes = require("./routes/albums");
const userRoutes = require("./routes/user");
const axios = require("axios");
const Music = require("./models/music");
const Filter = require("./models/filter");
const { verifyUser } = require("./middleware/verify");

require("dotenv").config();
const app = express();
const Port = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", true);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/albums", albumRoutes);
app.use(authRoutes);
app.use("/user", verifyUser, userRoutes);

// add error middleware

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  if (status == 500) {
    var message = "Server Error";
  } else {
    var message = error.message;
  }
  const data = error;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    `mongodb+srv://rachitsharma:${encodeURIComponent(
      process.env.password
    )}@cluster0.6sf4nyy.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(Port, () => {
      console.log("Listening on Port");
    });

    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error in Database", err);
  });
