// src/api/controllers/cat-controller.js
import { addCat, getAllCats } from "../models/cat-model.js";

const getCats = async (req, res, next) => {
  try {
    const cats = await getAllCats();
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

const postCat = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Invalid or missing file");
      error.status = 400;
      return next(error);
    }

    const newCat = {
      cat_name: req.body.cat_name,
      weight: req.body.weight,
      owner: req.body.owner,
      birthdate: req.body.birthdate,
      filename: req.file.filename,
    };

    const result = await addCat(newCat);
    if (result.error) return next(new Error(result.error));

    res.status(201).json({ message: "New media item added", ...result });
  } catch (err) {
    next(err);
  }
};

export { getCats, postCat };
