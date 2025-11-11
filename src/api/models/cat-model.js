// src/api/models/cat-model.js
import promisePool from "../../utils/database.js";

// Hae kaikki kissat
const listAllCats = async () => {
  const [rows] = await promisePool.query("SELECT * FROM wsk_cats");
  return rows;
};

// Hae kissa ID:n perusteella
const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    "SELECT * FROM wsk_cats WHERE cat_id = ?",
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

// Lisää uusi kissa tietokantaan
const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }
  return { cat_id: result.insertId };
};

export { listAllCats, findCatById, addCat };
