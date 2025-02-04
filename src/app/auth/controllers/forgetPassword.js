const User = require("../../users/model");
const APIError = require("../../../utils/errors");
const sendEmail = require("../../../utils/mailService");
const moment = require("moment");

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email }).select(
      "name lastname email resetPassword"
    );

    if (!userData) {
      throw new APIError("Invalid user", 400);
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendEmail({
      from: "berkayketencitel@gmail.com",
      to: userData.email,
      subject: "Password Reset",
      text: `Password reset code: ${resetCode}`,
    });

    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          resetPassword: {
            code: resetCode,
            time: moment().add(10, "minutes").format("YYYY-MM-DD HH:mm:ss"),
          },
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Please check your mailbox." });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
  }
};

module.exports = forgetPassword;
