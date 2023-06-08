const Razorpay = require("razorpay");
const User = require("../models/user");
const crypto = require("crypto");
const order = require("../models/order");

exports.checkout = async function (req, res, next) {
  const userid = req.user.id;
  try {
    const UserData = await User.findById(userid);
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });

    const options = {
      amount: (UserData.cart.total + 35) * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    console.log(options);

    instance.orders.create(options, (error, order) => {
      if (error) {
        const error = new Error("Something Went Wrong");
        error.status = 500;
        return next(error);
      }
      res.status(200).json({ data: order });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.verifyPayment = async function (req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    console.log(req.body);
    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const userData = await User.findById(req.user.id);
      const Order = new order({
        name: "First Order",
        contactNo: "999999999",
        checkoutOrder: {
          items: userData.cart.items,
          order_total: userData.cart.cart_total,
          discount: userData.cart.discount,
          total: userData.cart.total,
        },

        user: userData._id,
      });
      await Order.save().then(async (data) => {
        userData.orders.unshift(data._id);
        await userData.save();
      });

      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      const error = new Error("Invalid signature sent!");
      error.status = 401;
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};
