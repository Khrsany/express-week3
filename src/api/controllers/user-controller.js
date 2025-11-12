// src/api/controllers/user-controller.js
import bcrypt from "bcrypt";
import {
  addUser,
  findUserByUsername,
  getUserById,
} from "../models/user-model.js";

export const getUser = async (req, res) => {
  res.json({ message: "GET users route working" });
};

// Luo uusi käyttäjä
export const postUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }

    // Tarkistetaan onko käyttäjänimi jo olemassa
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "username already exists" });
    }

    // Hashataan salasana
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tallennetaan käyttäjä tietokantaan
    const newUser = await addUser({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "user created",
      user: newUser,
    });
  } catch (err) {
    console.error("💥 postUser error:", err.message);
    res.status(500).json({ message: "server error" });
  }
};
