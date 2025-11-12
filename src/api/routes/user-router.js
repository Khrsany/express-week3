import express from "express";
import { getUser, createUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

// /api/v1/users
userRouter.route("/").get(getUser).post(createUser);

export default userRouter;
