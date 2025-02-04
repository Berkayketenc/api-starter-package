const User = require("../../../users/model");
const APIError = require("../../../../utils/errors");
const sendEmail = require("../../../../utils/mailService");
const moment = require("moment");

const sendLoginCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new APIError("Email is required.", 400);

    let user = await User.findOne({ email });

    if (!user)
      throw new APIError(
        "No users registered with this email address found.",
        404
      );

    const loginCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = moment().add(10, "minutes").toISOString();

    user.loginCode = { code: loginCode, expiresAt };
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Your Login Code",
      text: `Your Login Code: ${loginCode}. This code is valid for 10 minutes.`,
    });

    return res
      .status(200)
      .json({ success: true, message: "Access code has been sent." });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};

module.exports = sendLoginCode;
