// src/api/controllers/user-controller.js
import { addUser, getAllUsers } from "../models/user-model.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    const newUser = await addUser(req.body);
    res
      .status(201)
      .json({ message: "New user added", user_id: newUser.user_id });
  } catch (err) {
    next(err);
  }
};

export { getUsers, postUser };
