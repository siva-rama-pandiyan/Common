const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    jwt.verify(
      authHeaders,
      "a060d57c-4eb9-425f-bd51-7e86764ab7fb",
      (err, user) => {
        if (err) return res.status(403).json("Token is inValid");
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
