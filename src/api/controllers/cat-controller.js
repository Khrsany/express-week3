// src/api/controllers/cat-controller.js
import { listAllCats, findCatById, addCat } from "../models/cat-model.js";

// hae kaikki kissat
const getAllCats = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (err) {
    console.error("Error fetching cats:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// hae yksittäinen kissa id:n perusteella
const getCatById = async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await findCatById(id);
    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
    }
    res.json(cat);
  } catch (err) {
    console.error("Error fetching cat:", err);
    res.status(500).json({ message: "Database error" });
  }
};

// lisää uusi kissa
const createCat = async (req, res) => {
  try {
    const result = await addCat(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding cat:", err);
    res.status(500).json({ message: "Database error" });
  }
};

export { getAllCats, getCatById, createCat };
