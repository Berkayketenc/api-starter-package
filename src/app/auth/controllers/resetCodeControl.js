const User = require("../../users/model");
const APIError = require("../../../utils/errors");
const moment = require("moment");
const { createTemporaryToken } = require("../../../middlewares/auth");

const resetCodeControl = async (req, res) => {
  try {
    const { email, code } = req.body;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const userData = await User.findOne({ email })
      .select("_id name lastname email resetPassword")
      .lean();

    if (!userData || !userData.resetPassword || !userData.resetPassword.time) {
      throw new APIError("The code expires invalid.", 401);
    }

    const resetTime = moment(
      userData.resetPassword.time,
      "YYYY-MM-DD HH:mm:ss"
    );
    if (
      resetTime.diff(moment(), "minutes") <= 0 ||
      userData.resetPassword.code !== code
    ) {
      throw new APIError("Invalid code", 401);
    }

    const temporaryToken = await createTemporaryToken(
      userData._id,
      userData.email
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "You can reset your password",
        temporaryToken,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
  }
};

module.exports = resetCodeControl;
