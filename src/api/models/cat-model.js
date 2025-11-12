// src/api/models/cat-model.js
import { query } from "../../utils/database.js";

/**
 * Lisää uusi kissa tietokantaan
 */
const addCat = async ({ cat_name, weight, owner, birthdate, filename }) => {
  const sql = `
    INSERT INTO wsk_cats (cat_name, weight, owner, birthdate, filename)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [cat_name, weight, owner, birthdate, filename];

  try {
    const result = await query(sql, params);
    return {
      cat_id: result.insertId,
      cat_name,
      weight,
      owner,
      birthdate,
      filename,
    };
  } catch (err) {
    return { error: err.message };
  }
};

/**
 * Hae kaikki kissat tietokannasta
 */
const getAllCats = async () => {
  const sql = `
    SELECT cat_id, cat_name, weight, owner, birthdate, filename
    FROM wsk_cats
  `;
  const cats = await query(sql);
  return cats;
};

/**
 * Hae yksittäinen kissa ID:n perusteella (tarvittaessa)
 */
const getCatById = async (cat_id) => {
  const sql = `
    SELECT cat_id, cat_name, weight, owner, birthdate, filename
    FROM wsk_cats
    WHERE cat_id = ?
    LIMIT 1
  `;
  const rows = await query(sql, [cat_id]);
  return rows[0];
};

export { addCat, getAllCats, getCatById };
