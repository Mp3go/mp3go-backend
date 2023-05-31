const mongoose = require("mongoose");
const { Schema } = mongoose;

const musicSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  artist: {
    type: [String],
    require: true,
  },
  language: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
  },
  lyric: {
    type: String,
    default: "No Lyrics Available",
  },
});

const Music = mongoose.model("Music", musicSchema);
module.exports = Music;
