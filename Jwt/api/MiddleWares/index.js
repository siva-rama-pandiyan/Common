const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    jwt.verify(
      authHeaders,
      "6e7551e8-0ab4-437f-83b8-772ba95c4f9b",
      (err, user) => {
        if (err) return res.status(403).json("Token is inValid",err);
        req.user = user;
        next();
      }
    );
  } else {
    res.status(401).json("You are not authenticated");
  }
};

module.exports = {
  verifyToken,
};
