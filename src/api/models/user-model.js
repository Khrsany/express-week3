// src/api/models/user-model.js
import { query } from "../../utils/database.js";

// Luo uusi käyttäjä. Salasana on jo hashattu controllerissa.
const addUser = async ({ name, username, email, password, role = "user" }) => {
  const sql = `
    INSERT INTO wsk_users (name, username, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [name, username, email, password, role];
  const result = await query(sql, params);
  return {
    user_id: result.insertId,
    name,
    username,
    email,
    role,
  };
};

// Hae käyttäjä käyttäjänimellä (loginia varten)
const findUserByUsername = async (username) => {
  const sql = `
    SELECT user_id, name, username, email, password, role
    FROM wsk_users
    WHERE username = ?
    LIMIT 1
  `;
  const rows = await query(sql, [username]);
  return rows[0] || null;
};

// (Tarpeen mukaan – jos sinulla on muualla kutsu tälle)
const getUserById = async (id) => {
  const sql = `
    SELECT user_id, name, username, email, role
    FROM wsk_users
    WHERE user_id = ?
  `;
  const rows = await query(sql, [id]);
  return rows[0] || null;
};

export { addUser, findUserByUsername, getUserById };
