const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.postSignup = async (req, res, next) => {
  try {
    const user = req.body;
    console.log(req.body);
    const ifUserNumbertaken = await User.findOne({ phoneNo: user.phoneNo });
    const ifUserEmailtaken = await User.findOne({ email: user.email });
    if (ifUserEmailtaken || ifUserNumbertaken) {
      let error = new Error("User Already Available");
      error.statusCode = 409;
      next(error);
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: user.name,
        email: user.email.toLowerCase(),
        password: user.password,
        img: user.img,
        phoneNo: user.phoneNo,
      });
      await newUser.save();
      res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email: email.toLowerCase() }).then((dbUser) => {
      if (!dbUser) {
        let error = new Error("No User Founded");
        error.statusCode = 401;
        next(error);
      } else {
        bcrypt.compare(password, dbUser.password).then((isCorrect) => {
          if (isCorrect) {
            const tokenData = {
              userid: dbUser._id,
            };
            jwt.sign(
              tokenData,
              process.env.key,
              { expiresIn: "1d" },
              (err, token) => {
                if (err)
                  return res.status(400).json({ message: "Server Error" });
                return res.status(200).json({
                  message: "Success",
                  token: token,
                });
              }
            );
          } else {
            let error2 = new Error("Invalid Username or Password");
            error2.statusCode = 401;
            next(error2);
          }
        });
      }
    });
  } catch (err) {
    next(err);
  }
};
