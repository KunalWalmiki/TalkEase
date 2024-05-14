const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");
const crypto = require("crypto")
require("dotenv").config();

exports.getAllMessages = async(req, res) => {

    try {

        const allMessages = await Message.find({chat : req.params.chatId})
        .populate("sender", "firstName lastName image")
        // .populate("receiver")
        .populate("chat").exec();


        return res.status(200).json({
            success : true,
            message : "All Messages fetched Successfuly",
            allMessages,
        });

    } catch(error) {

        console.log(error);
        return res.status(501).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}

exports.sendMessage = async(req, res) => {

    try {
            const {content, chatId} = req.body;

            if(!content | !chatId) {

                return res.status(401).json({
                    success : false,
                    message : "Content Or ChatId is Missing...!",
                });
            }
            
            const newMessage = {
                sender : req.user.id,
                content : content,
                chat : chatId,
            }

            let message = await Message.create(newMessage);

            message = await message.populate("sender", "firstName lastName");
            message = await message.populate("chat");
            message = await message.populate("reciever");
            message = await User.populate(message, {
                path : "chat.users",
                select : "firstName lastName image"
            });


            await Chat.findByIdAndUpdate(req.body.chatId, {
                    lastMessage : message,
            });

            return res.status(200).json({
                success : true,
                message : "Message Send Successfuly",
                message : message,
            });

    } catch(error) {

            console.log(error);
            return res.status(501).json({
                success : false,
                message : "Internal Server Error",
            })
    }
}