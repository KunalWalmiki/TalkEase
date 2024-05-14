const express = require("express");
const router = express.Router();

const {
    login,
    signup,
    getAllUsers,
} = require("../controllers/auth");

const {
   auth,
} = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", auth, getAllUsers)

module.exports = router;