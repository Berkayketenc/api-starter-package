const User = require("../../../../app/users/model");

const updateUserProfile = async (req, res) => {
  try {
    if (!req.User) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }

    const { name, lastname } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.User._id,
      { name, lastname },
      { new: true, select: "_id name lastname email" }
    );

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "An error occurred." });
  }
};

module.exports = updateUserProfile;
