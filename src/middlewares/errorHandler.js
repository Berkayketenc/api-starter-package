const APIError = require("../utils/errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error("Global Hata:", err.message);

  if (err instanceof APIError) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Server error! Check API!",
  });
};

module.exports = errorHandlerMiddleware;
