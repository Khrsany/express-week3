// src/api/models/user-model.js
import { query } from "../../utils/database.js";

/**
 * Lisää uusi käyttäjä tietokantaan
 * Salasana on jo hashattu controllerissa ennen kutsua
 */
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

/**
 * Hae kaikki käyttäjät tietokannasta
 */
const getAllUsers = async () => {
  const sql = `
    SELECT user_id, name, username, email, role
    FROM wsk_users
  `;
  const users = await query(sql);
  return users;
};

/**
 * Hae yksittäinen käyttäjä käyttäjänimellä (kirjautumista varten)
 */
const findUserByUsername = async (username) => {
  const sql = `
    SELECT user_id, name, username, email, password, role
    FROM wsk_users
    WHERE username = ?
    LIMIT 1
  `;
  const rows = await query(sql, [username]);
  return rows[0];
};

export { addUser, getAllUsers, findUserByUsername };
