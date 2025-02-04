const User = require("../../users/model");
const bcrypt = require("bcrypt");
const APIError = require("../../../utils/errors");
const { createToken } = require("../../../middlewares/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });

  if (!userData) {
    throw new APIError("Email or password is incorrect", 401);
  }

  const comparePass = await bcrypt.compare(password, userData.password);
  if (!comparePass) {
    throw new APIError("Email or password is incorrect", 401);
  }

  createToken(userData, res);
};

module.exports = login;
