const jwt = require('jsonwebtoken');

exports.verifyUser = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.key, (err, decode) => {
      if (err) {
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
    let error = new Error("Please Login First");
    error.statusCode = 401;
    next(error);
  }
};
