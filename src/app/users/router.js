const router = require("express").Router();

const getUserProfile = require("../../app/users/profileData/controllers/getUserProfile");
const updateUserProfile = require("../../app/users/profileData/controllers/updateUser");


const { tokenCheck } = require("../../middlewares/auth");

router.get("/profile", tokenCheck, getUserProfile);

router.put("/profile-update", tokenCheck, updateUserProfile);



module.exports = router;
