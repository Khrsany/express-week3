// Tuodaan moduulit
import express from "express";
import api from "./api/index.js";

// Luodaan Express-sovellus
const app = express();

// Sallitaan JSON-datan lukeminen pyynnön rungosta
app.use(express.json());

// Liitetään API (kootut reitit: cat + user)
app.use("/api/v1", api);

// ---------------------------
// 1. Pääreitti (root path)
// ---------------------------
app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

// ---------------------------
// 2. Staattiset tiedostot (public folder)
// ---------------------------
app.use("/public", express.static("public"));

// Viedään app muualle (index.js käyttää tätä)
export default app;
