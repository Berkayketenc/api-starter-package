require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const path = require("path");
const apiLimiter = require("./src/middlewares/rateSecurity");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const mongoSanitize = require("express-mongo-sanitize");
const mongoose = require("mongoose");

const port = process.env.PORT || 5003;
const router = require("./src/routers");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Istanbul");

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connection successful!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/db-test", async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    if (isConnected) {
      console.log("Successfully connected to MongoDB!");
      res.json({ success: true, message: "MongoDB connection is active!" });
    } else {
      console.warn("MongoDB connection is not active yet!");
      res
        .status(500)
        .json({ success: false, message: "MongoDB connection failed!" });
    }
  } catch (error) {
    console.error("MongoDB connection test failed:", error);
    res
      .status(500)
      .json({ success: false, message: "MongoDB connection error!" });
  }
});

app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "src/public/uploads")));

app.use(cors(corsOptions));

console.log(
  "Static file service active, directory:",
  path.join(__dirname, "public/uploads")
);

app.use("/api", apiLimiter);
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

app.use((req, res, next) => {
  console.log(`New request received: ${req.method} ${req.url}`);
  next();
});

app.use("/api", router);

app.get("/", (req, res) => {
  res.json({
    message: "welcome",
  });
});

app.use(errorHandlerMiddleware);

process.on("uncaughtException", (err) => {
  console.error("Unexpected Error:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Promise Rejection:", reason);
});

app.listen(port, () => {
  console.log(`Server ${port} working from port...`);
});
