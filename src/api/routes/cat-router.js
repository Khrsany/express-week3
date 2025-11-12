import express from "express";
import {
  getCats,
  getCatById,
  createCat,
  updateCat,
} from "../controllers/cat-controller.js";

const catRouter = express.Router();

// /api/v1/cats
catRouter.route("/").get(getCats).post(createCat);

catRouter.route("/:id").get(getCatById).put(updateCat);

export default catRouter;
