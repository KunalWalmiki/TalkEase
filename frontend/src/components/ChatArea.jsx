import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import "./Style.css"; 
import { useSelector } from 'react-redux';
import {motion, AnimatePresence} from "framer-motion"
import { useParams } from 'react-router-dom';
import { getAllMessages, sendMessage } from '../services/operations/chat';
import  io   from "socket.io-client";
import toast from 'react-hot-toast';
import Spinner from './Spinner';
var socket;

// const endPoint = "http://localhost:4000"; 
const endPoint = import.meta.env.VITE_SOCKET_BASE_URL;

const ChatArea = () => {

  
  const [message, setMessage] = useState("");
  const theme = useSelector((state) => state.themeKey);
  const param = useParams();
  const [chat_id, chat_user] = param.id.split("&");
  const [allMessages, setAllMessages] = useState([]);
  const {user} = useSelector((state) => state.auth);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const userData = JSON.parse(user);
  var image;

  if(allMessages.length > 0) {

    allMessages.map((message) => {

         
         let sender = message.sender;
         if(sender?._id !== userData?.id) {

             image = sender.image;

         }

    })
  }

  const fetchAllMessage = async() => {

    const response = await getAllMessages(chat_id);

    if(response) {
       
      setAllMessages(response);

    }

  }

  useEffect(() => {

    socket = io(endPoint);
    socket.emit("setup", userData);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    })

  }, [])

  useEffect(() => {
    
    fetchAllMessage();
    socket.emit("join chat", chat_id);

  }, [chat_id, chat_user]);

  useEffect(() => {

    socket.on('receiveMessage', (data) => {
      console.log("data", data);

      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };

  }, []);

  const createSendMessage = async() => {

    if(!message | !chat_id) {

         toast.error("chat_id or Message is Missing")
         return;

    }

    const response = await sendMessage(message, chat_id);
    // console.log("response",response);
    socket.emit('sendMessage', response);
    setMessage(''); // Clear input field after sending message
    // fetchAllMessage();

  }

  return (
    <AnimatePresence>
       <motion.div 
       initial={{scale : 0, opacity : 0}}
       animate={{opacity : 1, scale : 1}}
       exit={{opacity : 0, scale : 0}}
       transition={{
         ease : "anticipate",
         duration : "0.3"
       }}
       className='chatArea_container flex '>
          <div className={`chatArea_header flex w-10/12 md:w-11/12  ${theme ? "dark" : ""}`}>
            <div className='chat_content'>
            {/* <p className='con_icon'>{}</p> */}
            <Avatar src={image} />
            <div>
            <p className='con_title'>{chat_user}</p>
            {/* <p className='con_timeStamp'>{conversation?.timeStamp}</p> */}
            </div>
            </div>
            <IconButton>
            <DeleteIcon className={`${theme ? "dark" : ""}`}/>
            </IconButton>
          </div>
          <div className={`messages_container flex flex-col w-10/12 md:w-11/12 ${theme ? "dark" : ""}`}>
            {
               allMessages &&
               (

                //  .slice(0)
               //  .reverse()
               allMessages.map((message, index) => {

                const sender = message.sender;
                const self_id = userData.id;

                if(sender._id === self_id) {

                  return <MessageSelf props={message} key={index}/>

                } else {

                  return <MessageOthers props={message} key={index} image={sender.image}/>
                }

             })
             )
            }
          </div>

          <div className={`text_input_area flex items-center justify-between w-10/12 md:w-11/12  ${theme ? "dark" : ""}`}>
             
             {/* <div className='input-container w-full'> */}

             {/* <input 
             onChange={(e) => {
                 setMessage(e.target.value);
             }}
             type="text" 
             value={message}
             onKeyDown={(e) => {
              
              if(e.code == "Enter") {
                createSendMessage();
              }
             } }

             placeholder='Type a Message' 
             className={`search_box input-container ${theme ? "" :"text-black"}`}/> */}
             <TextField
          id="outlined-multiline-flexible"
          // label="Multiline"
          multiline
          variant="standard" 
          maxRows={2}
          placeholder='Type a Message'
          inputProps={{
            style: {
              color: `${theme ? "white" : " black"}`, // Set text color to white
            }
          }}
          className={`w-full outline-0 `}
          InputProps={{ disableUnderline: true }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          onKeyDown={(e) => {
              
            if(e.code == "Enter") {
              createSendMessage();
            }
           }}

        />
             {/* </div> */}
             <IconButton
             onClick={createSendMessage}
             >
              
             
             <SendIcon 
             className={`${theme ? "text-slate-100" : "text-blue-700"}`}/>
             </IconButton>
          </div>  
    </motion.div>
    </AnimatePresence>
   
  )
}

export default ChatArea
