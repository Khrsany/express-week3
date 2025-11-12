// src/api/routes/cat-router.js
import { Router } from "express";
import { body } from "express-validator";
import { authenticateToken } from "../../middlewares/authentication.js";
import { upload } from "../../middlewares/upload.js";
import { validationErrors } from "../../middlewares/error-handlers.js";
import { getCats, postCat } from "../controllers/cat-controller.js";

const catRouter = Router();

catRouter
  .route("/")
  .get(getCats)
  .post(
    authenticateToken,
    upload.single("file"),
    body("cat_name").trim().isLength({ min: 3, max: 50 }),
    body("weight").isNumeric(),
    body("owner").isInt(),
    body("birthdate").isDate(),
    validationErrors,
    postCat
  );

export default catRouter;
