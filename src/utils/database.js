// src/utils/database.js
import mysql from "mysql2";
import "dotenv/config"; // lataa .env muuttujat käyttöön

// luodaan yhteyspooli (pool = monen yhteyden hallinta tehokkaasti)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// tehdään poolista asynkroninen versio (käytetään async/await)
const promisePool = pool.promise();

export default promisePool;
