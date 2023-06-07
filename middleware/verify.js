const jwt = require("jsonwebtoken");

exports.verifyUser = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "BoB", (err, decode) => {
      if (err) {
        return res.status(400).json({
          message: "Failed to Authenticate",
        });
      }
      req.user = {};
      req.user.id = decode.userid;
      next();
    });
  } 
};
