// src/middlewares/error-handlers.js
import { validationResult } from "express-validator";

// 1. Not Found -handler
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// 2. Validation error handler
const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((e) => `${e.path}: ${e.msg}`)
      .join(", ");
    const error = new Error(messages);
    error.status = 400;
    return next(error);
  }
  next();
};

// 3. Generic error handler
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export { notFoundHandler, validationErrors, errorHandler };
