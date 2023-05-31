const mongoose = require("mongoose");
const { Schema } = mongoose;

const filterSchema = new Schema({
  languages: {
    type: [],
    require: true,
  },
  artists: {
    type: [String],
    require: true,
  },
});

const Filter = mongoose.model("Filter", filterSchema);
module.exports = Filter;
