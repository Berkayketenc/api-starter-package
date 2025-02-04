const rateLimit = require("express-rate-limit");

const securityPerson = ["::1"];

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req) => {
    console.log("API URL:", req.url);
    return req.url === "/login" || req.url === "/register" ? 5 : 100;
  },
  message: {
    success: false,
    message: "Too many requests! Please try again later.",
  },
  skip: (req, res) => securityPerson.includes(req.ip),
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
