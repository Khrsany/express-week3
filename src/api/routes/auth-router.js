// src/api/routes/auth-router.js
import { Router } from "express";
import { postLogin, getMe } from "../controllers/auth-controller.js";
import { authenticateToken } from "../../middlewares/authentication.js";

const authRouter = Router();

// POST /api/v1/auth/login  (kirjautuminen)
authRouter.post("/login", postLogin);

// GET /api/v1/auth/me  (suojattu reitti)
authRouter.get("/me", authenticateToken, getMe);

export default authRouter;
