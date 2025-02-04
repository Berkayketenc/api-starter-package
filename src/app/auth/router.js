const router = require("express").Router();
const {
  login,
  register,
  forgetPassword,
  resetCodeControl,
  resetPassword,
} = require("../auth/controllers");

const sendLoginCode = require("../auth/controllers/OTP/sendLoginCode");
const verifyLoginCode = require("../auth/controllers/OTP/verifyLoginCode");

const AuthValidation = require("../../middlewares/validations/auth.validation");
const upload = require("../../middlewares/lib/upload");

router.post("/login", AuthValidation.login, login);
router.post("/register", AuthValidation.register, register);
router.post("/forget-password", forgetPassword);
router.post("/reset-code-check", resetCodeControl);
router.post("/reset-password", resetPassword);
router.post("/send-login-code", sendLoginCode);
router.post("/verify-login-code", verifyLoginCode);

module.exports = router;
