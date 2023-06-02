const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // gender: {
    //   type: String,
    //   enum: ["Male", "Female", "Other"],
    //   required: true,
    // },
    // phone: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
