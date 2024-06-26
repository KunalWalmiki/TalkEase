const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({

    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    reciever : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    chat : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat",
    },
    content : {
        type : String,
        required : true,
    }

}, 
{
   timestamps : true,
});


module.exports = mongoose.model("Message", messageSchema);
