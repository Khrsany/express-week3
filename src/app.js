import express from "express";
import api from "./api/index.js";

const app = express();

app.use(express.json());

// liitetään API (reitit: cats + users)
app.use("/api/v1", api);

// pääreitti
app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

// staattiset tiedostot
app.use("/public", express.static("public"));

export default app;
