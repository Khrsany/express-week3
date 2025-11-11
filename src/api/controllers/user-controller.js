// src/api/controllers/user-controller.js
import { listAllUsers, findUserById, addUser } from "../models/user-model.js";

// hae kaikki käyttäjät
const getAllUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// hae käyttäjä id:n perusteella
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// lisää uusi käyttäjä
const createUser = async (req, res) => {
  try {
    const result = await addUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Database error" });
  }
};

export { getAllUsers, getUserById, createUser };
