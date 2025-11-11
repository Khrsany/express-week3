import express from "express";
import catRouter from "./routes/cat-router.js";
import userRouter from "./routes/user-router.js";

const router = express.Router();

// yhdistetään kissareitit ja käyttäjäreitit
router.use("/cats", catRouter);
router.use("/users", userRouter);

export default router;
