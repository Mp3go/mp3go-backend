const jwt = require("jsonwebtoken");

exports.verifyUser = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    if (token == "") {
      let error = new Error("Please Login First");
      error.statusCode = 401;
      next(error);
      return;
    }
    jwt.verify(token, "BoB", (err, decode) => {
      if (err) {
        console.log("Invalid Token");
        let error = new Error("Invalid Token");
        error.statusCode = 401;
        next(error);
        return;
      }
      req.user = {};
      req.user.id = decode.userid;
      next();
    });
  } else {
    console.log("Invalid Token");
    let error = new Error("Invalid Token");
    error.statusCode = 401;
    next(error);
  }
};
