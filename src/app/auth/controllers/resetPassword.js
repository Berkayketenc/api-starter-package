const User = require("../../users/model");
const bcrypt = require("bcrypt");
const APIError = require("../../../utils/errors");
const { decodedTemporaryToken } = require("../../../middlewares/auth");
const Response = require("../../../utils/response");

const resetPassword = async (req, res) => {
  try {
    const { password, temporaryToken } = req.body;
    const decodedToken = await decodedTemporaryToken(temporaryToken);

    if (!decodedToken) {
      throw new APIError("Invalid or expired token.", 401);
    }

    const hashPassword = await bcrypt.hash(password, 16);
    const updatedUser = await User.findByIdAndUpdate(
      decodedToken._id,
      {
        $set: {
          resetPassword: { code: null, time: null },
          password: hashPassword,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new APIError("User not found.", 404);
    }

    return new Response(decodedToken, "Password reset successful").success(res);
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
  }
};

module.exports = resetPassword;
