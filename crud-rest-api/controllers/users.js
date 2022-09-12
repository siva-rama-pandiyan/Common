import { v4 as uuidv4 } from "uuid";
let users = [];

export const getUsers = (req, res) => {
  res.send(users);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((item) => item.id === id);
  if (foundUser) res.send(foundUser);
  else res.send("User Not Found");
};

export const createUsers = (req, res) => {
  const user = req.body;
  const newUser = {
    id: uuidv4(),
    ...user,
  };

  users.push(newUser);
  res.send(users);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter((item) => item.id !== id);
  res.send(`User Deleted Successfully..!!`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, age } = req.body;

  const user = users.find((item) => {
    return item.id === id;
  });
  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (age) user.age = age;

  res.send(user);
};
