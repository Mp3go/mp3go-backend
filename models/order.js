var mongoose = require("mongoose");
const user = require("./user");

var orderSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: String,
  address: {
    addr: String,
    city: String,
    state: String,
    pin: String,
  },
  contactNo: Number,
  checkoutOrder: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Music",
        },
        qty: Number,
      },
    ],
    order_total: Number,
    discount: Number,
    total: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);
