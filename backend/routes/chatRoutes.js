const Chat = require("../models/ChatModel");
const express = require("express");
const router = express.Router();

const {

    fetchChats,
    accessChats,
    createGroup,
    exitGroup,
    fetchGroups,
    addSelfToGroup,

} = require("../controllers/chat");

const { auth } = require("../middlewares/auth");
const { sendMessage, getAllMessages} = require("../controllers/message");

router.post("/accessChat", auth, accessChats);
router.get("/fetchChats", auth, fetchChats);
router.get("/fetchGroups", auth, fetchGroups);
router.post("/createGroup", auth, createGroup);
router.post("/exitGroup", auth, exitGroup);
router.put("/addSelfToGroup", auth,  addSelfToGroup);
router.post("/sendMessage", auth, sendMessage);
router.get("/getAllMessages/:chatId", auth, getAllMessages);


module.exports = router;