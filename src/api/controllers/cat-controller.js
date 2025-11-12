// src/api/controllers/cat-controller.js
import { listAllCats, findCatById, addCat } from "../models/cat-model.js";

// Hae kaikki kissat
export const getCats = async (_req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (err) {
    console.error("Virhe haettaessa kissoja:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Hae kissa ID:n perusteella
export const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) return res.status(404).json({ message: "Cat not found" });
    res.json(cat);
  } catch (err) {
    console.error("Virhe haettaessa kissaa ID:llä:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Luo uusi kissa
export const createCat = async (req, res) => {
  try {
    const result = await addCat(req.body);
    if (!result) return res.status(400).json({ message: "Cat not added" });
    res.status(201).json({ message: "Cat added", cat_id: result.cat_id });
  } catch (err) {
    console.error("Virhe lisättäessä kissaa:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// Päivitä kissa (tässä vain malliksi – voi täydentää myöhemmin)
export const updateCat = async (_req, res) => {
  res.json({ message: "UpdateCat toimii (testi)" });
};
