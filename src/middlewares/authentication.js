// src/middlewares/authentication.js
import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticateToken = (req, res, next) => {
  // Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // voi olla undefined

  if (!token) return res.sendStatus(401);

  try {
    // dekoodattu käyttäjä talteen controllerin luettavaksi
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ message: "invalid token" });
  }
};

export { authenticateToken };
