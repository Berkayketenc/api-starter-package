const router = require("express").Router();

const auth = require("../app/auth/router");
const user = require("../app/users/router");

const uploadMiddleware = require("../middlewares/uploadMiddleware");

router.use("/auth", auth);

router.use(user);

router.post("/upload", uploadMiddleware);

module.exports = router;
