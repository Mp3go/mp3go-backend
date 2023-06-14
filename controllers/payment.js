const Razorpay = require("razorpay");
const User = require("../models/user");
const crypto = require("crypto");
const order = require("../models/order");

exports.checkout = async function (req, res, next) {
  const userid = req.user.id;
  const amount = req.body.amount;
  try {
    const UserData = await User.findById(userid);
    const instance = new Razorpay({
      key_id: process.env.key_id,
      key_secret: process.env.key_secret,
    });
    if (!parseInt(amount) === UserData.cart.cart_total) {
      var error = new Error("Invalid Payment Details");
      error.status(409);
      next(error);
      return;
    }
    const options = {
      amount: (UserData.cart.total + UserData.cart.total * (5 / 100)) * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

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
  const userid = req.user.id;
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.key_secret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const userData = await User.findById(req.user.id).populate(
        "cart.items.product"
      );
      const Order = new order({
        name: userData.name,
        contactNo: userData.phoneNo,
        checkoutOrder: {
          items: userData.cart.items,
          order_total: userData.cart.cart_total,
          discount: userData.cart.discount,
          total: userData.cart.total,
        },
        user: userData._id,
        paymentId: razorpay_payment_id,
      });
      console.log(Order);
      await Order.save().then(async (data) => {
        userData.orders.unshift(data._id);
        userData.cart = {};
        await userData.save();
      });
      // const result = await userData
      //   .findById(userid)
      //   .populate("cart.items.product");
      return res.status(200).send("Successfull");
    } else {
      const error = new Error("Invalid signature sent!");
      error.status = 401;
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};
