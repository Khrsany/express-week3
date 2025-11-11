import { addCat, findCatById, listAllCats } from "../models/cat-model.js";

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  console.log("Form data:", req.body); // tulostaa tekstikenttien tiedot
  console.log("File data:", req.file); // tulostaa ladatun tiedoston tiedot

  // tallennetaan mock "tietokantaan"
  const result = addCat(req.body);

  if (result.cat_id) {
    res.status(201).json({
      message: "New cat added.",
      body: req.body,
      file: req.file,
      result,
    });
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  res.json({ message: "Cat item updated." });
};

const deleteCat = (req, res) => {
  res.json({ message: "Cat item deleted." });
};

export { getCat, getCatById, postCat, putCat, deleteCat };
