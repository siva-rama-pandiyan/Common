const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const PORT = 4000;
app.use(express.json());
const users = [
  {
    id: 1,
    username: "siva",
    password: "siva1234",
    isAdmin: true,
  },
  {
    id: 1,
    username: "Virat",
    password: "virat1234",
    isAdmin: false,
  },
];

let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    "6e7551e8-0ab4-437f-83b8-772ba95c4f9b",
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    "a060d57c-4eb9-425f-bd51-7e86764ab7fb",
    { expiresIn: "15m" }
  );
};

app.post("/api/refresh", (req, res) => {
  let refreshToken = req.body.token;
  if (!token) return res.status(401).json("You are not authenticated");
  if(!refreshTokens.includes(refreshToken)){
    return res.status(403).json('refresh token is not valid');
  }
  jwt.verify(refreshToken,"a060d57c-4eb9-425f-bd51-7e86764ab7fb",(err, user) => {
    err && console.log(err)
    refreshToken = refreshTokens.filter(token => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    })
  }) 

});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username === username;
  });
  if (user) {
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else res.send("User not found");
});

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

app.delete("/delete/:id", verifyToken, (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    res.status(200).json("User Deleted Successfully");
  } else {
    res.status(400).json("You are not allowed to delete user");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
