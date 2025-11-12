// src/index.js
import app from "./app.js";
import "dotenv/config";

const hostname = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}/`);
});
