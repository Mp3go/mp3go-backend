const express = require("express");
const mongoose = require("mongoose");
// const path = require("path");
// const authRoutes = require("./routes/auth");
const albumRoutes = require("./routes/albums");
// const userRoutes = require("./routes/user");
const axios = require("axios");
const Music = require("./models/music");
const Filter = require("./models/filter");
require("dotenv").config();
const app = express();
const Port = process.env.port || 3000;
app.use("/albums", albumRoutes);
// app.use(authRoutes);
// app.use("/user", userRoutes);

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
    console.log("Error in Database");
  });
