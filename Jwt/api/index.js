const express = require("express");
const { login, refresh, deleteUser } = require("./Controller");
const { verifyToken } = require("./MiddleWares");
const app = express();

const PORT = 4000;
app.use(express.json());

app.post("/api/refresh", refresh);

app.post("/login", login);

app.delete("/delete/:id", verifyToken, deleteUser);

app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});
