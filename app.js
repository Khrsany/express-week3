// Tuodaan express-moduuli
import express from "express";

// Määritellään palvelimen osoite ja portti
const hostname = "127.0.0.1";
const port = 3000;

// Luodaan Express-sovellus
const app = express();

// Sallitaan JSON-datan lukeminen pyynnön rungosta
app.use(express.json());

// ---------------------------
// 1. Pääreitti (root path)
// ---------------------------
// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

// ---------------------------
// 2. JSON-dataa palauttava reitti
// ---------------------------
// http://localhost:3000/api/resource
app.get("/api/resource", (req, res) => {
  // Jos query-parametreja ei ole
  if (!req.query.id) {
    const myData = {
      title: "This is an item",
      description: "Just some dummy data here",
    };
    return res.json(myData);
  }

  // Jos query-parametri löytyy (?id=99)
  if (req.query.id === "99") {
    console.log("query params object:", req.query);
    const myData = {
      title: `This is a specific item, id: ${req.query.id}`,
      description: "Just some dummy data here",
    };
    return res.json(myData);
  }

  // Muissa tapauksissa 404
  res.sendStatus(404);
});

// ---------------------------
// 3. Reitti, joka lukee parametrin URL:ista
// ---------------------------
// http://localhost:3000/api/resource/99
app.get("/api/resource/:id", (req, res) => {
  console.log("path variables:", req.params);

  if (req.params.id === "99") {
    const myData = {
      title: `This is a specific item, id: ${req.params.id}`,
      description: "Just some dummy data here",
    };
    res.json(myData);
  } else {
    res.sendStatus(404);
  }
});

// ---------------------------
// 4. POST-pyyntö: vastaanotetaan data
// ---------------------------
// POST http://localhost:3000/api/resource
app.post("/api/resource", (req, res) => {
  const body = req.body; // luetaan käyttäjän lähettämä data

  // palautetaan se takaisin selaimelle, jotta nähdään että se vastaanotettiin
  res.status(201).json({
    message: "Data received successfully!",
    your_request: body,
  });
});

// ---------------------------
// 5. CAT API - palauttaa kissan JSON-datan
// ---------------------------
// http://localhost:3000/api/v1/cat
app.get("/api/v1/cat", (req, res) => {
  const cat = {
    cat_id: 1,
    name: "Luna",
    birthdate: "2020-05-15",
    weight: 4.3,
    owner: "Ali",
    image: "https://loremflickr.com/320/240/cat",
  };

  res.json(cat);
});

// ---------------------------
// 6. Staattisten tiedostojen tarjoaminen (public folder)
// ---------------------------
// http://localhost:3000/public/cat.jpg
app.use("/public", express.static("public"));

// ---------------------------
// 5. Käynnistetään palvelin
// ---------------------------
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
