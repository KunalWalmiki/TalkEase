const express = require("express");
const router = express.Router();

const {

    getUserDetails,
    updateUserDetails,
    updateDisplayPicture,
    removeImage

} = require("../controllers/profile");
const { auth } = require("../middlewares/auth");


router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateUserDetails", auth, updateUserDetails);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.put("/removeImage", auth, removeImage);

module.exports = router;
