// src/app.js
import express from "express";
import cors from "cors";
import "dotenv/config";

// Reitit
import userRouter from "./api/routes/user-router.js";
import catRouter from "./api/routes/cat-router.js";
import authRouter from "./api/routes/auth-router.js";

const app = express();

// Middlewaret
app.use(cors()); // Sallii pyynnöt eri domainista (tarpeen testauksessa)
app.use(express.json()); // JSON-bodyjen käsittely
app.use(express.static("public")); // Palvelee esim. cat.jpg -kuvaa selaimessa

// Käytetään reittejä
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cats", catRouter);
app.use("/api/v1/auth", authRouter);

// Healthcheck (testausta varten)
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Server running" });
});

export default app;
