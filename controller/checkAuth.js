const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "hereIsMySpecialToken");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
      reason: "Token Missing˝",
    //   reason1: req.headers.authorization,
    });
  }
};
