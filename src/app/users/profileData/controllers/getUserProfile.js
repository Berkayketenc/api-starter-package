const getUserProfile = async (req, res) => {
  try {
    if (!req.User) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access!" });
    }

    return res.status(200).json({ success: true, user: req.User });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "An error occurred." });
  }
};

module.exports = getUserProfile;
