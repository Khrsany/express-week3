// src/api/models/user-model.js
import promisePool from "../../utils/database.js";

// hae kaikki käyttäjät
const listAllUsers = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_users");
  return rows;
};

// hae käyttäjä id:n perusteella
const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_users WHERE user_id = ?",
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

// lisää uusi käyttäjä
const addUser = async (user) => {
  const { name, username, email, password, role } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }
  return { user_id: result.insertId };
};

export { listAllUsers, findUserById, addUser };
