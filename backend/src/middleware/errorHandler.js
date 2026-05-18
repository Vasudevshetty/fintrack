export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const error = { ...err };
  error.message = err.message;

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error.statusCode = 400;
    error.message = message;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = `${Object.keys(err.keyValue)[0]} already exists`;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error.statusCode = 401;
    error.message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    error.statusCode = 401;
    error.message = "Token expired";
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error",
  });
};

export default errorHandler;
