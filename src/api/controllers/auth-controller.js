// src/api/controllers/auth-controller.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { findUserByUsername } from "../models/user-model.js";

export const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }

    // Etsi käyttäjä tietokannasta
    const user = await findUserByUsername(username);
    if (!user) {
      console.warn("❌ Käyttäjää ei löydy:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Jos tietokannassa ei ole password-kenttää, heitä virhe
    if (!user.password) {
      console.error("❌ Käyttäjän salasana puuttuu tietokannasta:", user);
      return res
        .status(500)
        .json({ message: "Database user missing password" });
    }

    // Tarkista salasana bcryptillä
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.warn("❌ Väärä salasana käyttäjälle:", username);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Luo token payload
    const userPayload = {
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    // Luo JWT-token
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("✅ Login OK:", username);
    res.json({ user: userPayload, token });
  } catch (err) {
    console.error("💥 postLogin error:", err.message);
    res.status(500).json({ message: "login error" });
  }
};

export const getMe = async (req, res) => {
  try {
    if (res.locals.user) {
      return res.json({ message: "token ok", user: res.locals.user });
    }
    res.sendStatus(401);
  } catch (err) {
    console.error("getMe error:", err.message);
    res.status(500).json({ message: "error" });
  }
};
