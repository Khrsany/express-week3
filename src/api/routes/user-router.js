// src/api/routes/user-router.js
import { Router } from "express";
import { body } from "express-validator";
import { validationErrors } from "../../middlewares/error-handlers.js";
import { getUsers, postUser } from "../controllers/user-controller.js";

const userRouter = Router();

userRouter
  .route("/")
  .get(getUsers)
  .post(
    body("email").trim().isEmail(),
    body("username").trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body("password").trim().isLength({ min: 8 }),
    validationErrors,
    postUser
  );

export default userRouter;
