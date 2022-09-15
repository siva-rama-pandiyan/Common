const express = require("express");
const { login, refresh, deleteUser, logoutUser } = require("./Controller");
const { verifyToken } = require("./MiddleWares");
const app = express();

const PORT = 4000;
app.use(express.json());

app.post("/api/refresh", refresh);

app.post("/api/login", login);

app.delete("/api/delete/:id", verifyToken, deleteUser);

app.post("/api/logout",verifyToken, logoutUser);

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
