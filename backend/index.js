const express = require("express");
const path = require("path");
const app = express();
const dbConnect = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const profileRoutes = require("./routes/profileRoutes");
const fileUpload = require("express-fileupload");

const cors = require("cors");
require("./config/cloudinary").cloudinaryConnect();
dbConnect();


app.use(express.json());
app.use(cors({
    origin : "*",
}));

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "tmp",
    })
)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/profile", profileRoutes);


// -------------------------------Deployment------------------------------

// server static files from the build directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Define a route that servers the index.html file for any route
app.get("/*", (req, res) => {

    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));

});

// --------------------------------------------------------------------------


console.log(path.join(__dirname, '../frontend/dist', 'index.html'));

app.get("/", (req, res) => {

    res.send("Welcome to TalkEase");

})


const server = app.listen(4000, () => {

    console.log("Your Server is Up and Running at 4000 Port");

});

const io = require("socket.io")(server, {

    cors : {
        origin : "*",
    },
    pingTimeout : 60000,

})

io.on("connection", (socket) => {

    console.log("socket.io connection established");

    socket.on("setup", (user) => {
        socket.join(user?._id);

        socket.emit("connected");

    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room : ", room);  
    })

    // socket.on("new message", (newMessageStatus) => {

    //     var chat = newMessageStatus.chat;

    //     if(!chat.users) {

    //         return console.log("Chat.users not defined");

    //     }

    //     chat.users.forEach((user) => {

    //         console.log(user?._id, newMessageStatus?.sender?._id);

    //         // if(user?._id !== newMessageStatus.sender?._id)  {

    //             socket.in(user?._id).emit("message recieved", newMessageStatus);

    //         // };

    //     })
    // })

    socket.on('sendMessage', (data) => {
        console.log('Message received:', data);
        // Broadcast message to all connected clients
        io.emit('receiveMessage', data);
      });

})