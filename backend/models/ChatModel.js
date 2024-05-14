const mongoose = require("mongoose");


const ChatSchema = new mongoose.Schema({

    chatName : {
        type : String,
    },
    isGroupChat : {
        type : Boolean,
    },
    lastMessage : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",
    },
    users : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
    groupAdmin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

},
{
    timestamps : true,
});


module.exports = mongoose.model("Chat", ChatSchema)