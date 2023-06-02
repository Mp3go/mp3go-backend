const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
  try {
    const user = req.body;
    const ifUserNametaken = await User.findOne({ username: user.username });
    const ifUserEmailtaken = await User.findOne({ email: user.email });
    if (ifUserEmailtaken || ifUserNametaken) {
      return res.status(400).json({ message: "User Already Available" });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: user.username.toLowerCase(),
        email: user.email.toLowerCase(),
        password: user.password,
      });
      newUser.save();
      res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((dbUser) => {
    if (!dbUser) {
      return res.status(400).json({ message: "No User Found" });
    }
    bcrypt.compare(password, dbUser.password).then((isCorrect) => {
      if (isCorrect) {
        const tokenData = {
          userid: dbUser._id,
        };
        jwt.sign(tokenData, "BoB", { expiresIn: "1d" }, (err, token) => {
          if (err) return res.status(400).json({ message: "Server Error" });
          console.log(token);
          return res.status(200).json({
            message: "Success",
            token: token,
          });
        });
      } else {
        return res.status(200).json({
          message: "Invalid Username or Password",
        });
      }
    });
  });
};
