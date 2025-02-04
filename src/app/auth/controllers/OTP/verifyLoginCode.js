const User = require("../../../users/model");
const APIError = require("../../../../utils/errors");
const { createToken } = require("../../../../middlewares/auth");
const moment = require("moment");

const verifyLoginCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code)
      throw new APIError("Email and code are required.", 400);

    const user = await User.findOne({ email });

    if (!user || !user.loginCode || !user.loginCode.code) {
      throw new APIError("Invalid code or email.", 401);
    }

    const isExpired = moment().isAfter(user.loginCode.expiresAt);
    if (isExpired) throw new APIError("The code has expired.", 401);

    if (user.loginCode.code !== code) throw new APIError("Wrong code.", 401);

    const token = createToken(user, res);

    user.loginCode = { code: null, expiresAt: null };
    await user.save();

    return res
      .status(200)
      .json({ success: true, token, message: "Login successful." });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

module.exports = verifyLoginCode;
