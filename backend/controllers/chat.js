const User = require("../models/UserModel");
const Chat = require("../models/ChatModel");

exports.accessChats = async(req, res) => {

    try {

        // fetch userId to whom you want to send message 
        const {userId, name} = req.body;

        if(!userId) {

            return res.status(401).json({
                success : false,
                message : "User Id is Required",
            })
        }

        // finding chat of person you wants to chat
        var isChat = await Chat.find({
            isGroupChat : false,
            $and : [
                {users : {$elemMatch : {$eq : req.user.id}}},
                {users : {$elemMatch : {$eq : userId}}}
            ]
        }).populate("users", "-password")
        .populate("lastMessage").exec();

        isChat = await User.populate(isChat, {
            path : "lastMessage.sender",
            select : "firstName lastName"
        });

        // is chat exists 
        if(isChat.length > 0) {

            return res.status(200).json({
                success : true,
                message : "Access Chat",
                isChat,
            });

        } else {

            // create new chat if there is no previous chat
            const chat = {
                chatName : name,
                isGroupChat : false,
                users : [req.user.id, userId],
            };

            const createdChat = await Chat.create(chat);
            const fullChat = await Chat.findOne({_id : createdChat._id})
            .populate("users", "-password").exec();

            return res.status(200).json({
                success : true,
                message : "New Chat Created",
                fullChat,
            })

        }

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });

    }
}

exports.fetchChats = async(req, res) => {

    try {

        const keyword = req.query.search 
        ? {
             $or :[
                {chatName : {$regex : req.query.search, $options : "i"}},
             ]
          }
        : null;

        if(keyword !== null) {

            const chats = await Chat.find({
                $and : [
                    keyword,
                    { users: { $elemMatch: { $eq: req.user.id } } }
                ]
            })
            .populate({
                path : "users",
                select : "-password"
            })
            .populate("groupAdmin", "firstName lastName")
            .populate("lastMessage", "firstName lastName content")
            .sort({updatedAt : -1}).exec();
    
            return res.status(200).json({
                success : true,
                message : "All Chats Fetched Successfuly",
                chats:chats,
            })

        } else {

            const chats = await Chat.find(
                { users: { $elemMatch: { $eq: req.user.id } } },
                )
                .populate({
                    path : "users",
                    select : "-password"
                })
                .populate("groupAdmin", "firstName lastName")
                .populate("lastMessage", "firstName lastName content")
                .sort({updatedAt : -1}).exec();
        
                return res.status(200).json({
                    success : true,
                    message : "All Chats Fetched Successfuly",
                    chats:chats,
                })

        }

        

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}

exports.fetchGroups = async(req, res) => {

    try {

        const allGroups = await Chat.where("isGroupChat").equals(true);

        return res.status(200).json({
            success : true,
            message : "All Groups Fetched Successfuly",
            allGroups,
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}

exports.createGroup = async(req, res) => {

    try {

        const {user, groupName} = req.body;

        if(!user | !groupName) {

            return res.status(401).json({
                success : false,
                message : "Users Or Group Name is Missing..!",
            })
        }

        // var users = [];
        // users.push(user);
        var users = [];
        user?.map((user) => {
            users.push(user);
        })

        const groupChat = await Chat.create({
            chatName : groupName,
            users : users,
            isGroupChat : true,
            groupAdmin : req.user.id
        });

        const fullGroupChat = await Chat.findOne({_id : groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .exec();

        return res.status(200).json({
            success : true,
            message : "Group Created Successfuly",
            fullGroupChat,
        })
        
    } catch(error) {

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
        })

    } 
}

exports.exitGroup = async(req, res) => {

    try {

        const {chatId} = req.body;
        const userId = req.user.id;

        if(!chatId | !userId) {

            return res.status(401).json({
                success : false,
                message : "ChatId Or UserId is Missing...!",
            });

        }

        const removed = await Chat.findByIdAndUpdate(
            chatId, 
            {
                $pull : {users : req.user.id}
            }, {new : true});
        
        if(!removed) {

            return res.status(401).json({
                success : false,
                message : "Group Not found",
            })
        
        } else {

            return res.status(200).json({
                success : true,
                message : "Exited Group Successfuly",
            })
        }  

     } catch(error) {

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error",
        })

    }
}

exports.addSelfToGroup = async(req, res) => {

    try {

        const {chatId} = req.body;
        const userId = req.user.id; 
        
        if(!chatId | !userId) {

            return res.status(401).json({
                success : false,
                message : "chatId or UserId is Missing...!",
            })
        }

        // find if existing user
        const user = await Chat.findById(chatId, {users : {$elemMatch : {$eq : req.user.id}}});

        if(user) {

            return res.status(401).json({
                success : false,
                message : "User Already Exist In The Group",
            })

        }

        const added = await Chat.findByIdAndUpdate(
            chatId, 
            {
                $push : {users : userId}
            }, 
            {
                new : true,
            }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password").exec();

        if(!added) {

            return res.status(401).json({
                success : false,
                message : "Chat Not Found",
            })

        } else {

            return res.status(200).json({
                success : true,
                message : "Added To Group",
            });
        }

    } catch(error) {

        console.log(error);
        return res.status(501).json({
            success : false,
            message : "Internal Server Error",
        });

    }
}
