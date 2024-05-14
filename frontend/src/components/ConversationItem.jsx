import React from 'react'
import "./Style.css"; 
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

const ConversationItem = ({conversation, chatName, image}) => {

  const name = chatName.replace(" ", "-");

  const navigate = useNavigate();
  const dateObj = new Date(conversation?.updatedAt);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

   // Determine AM/PM and adjust hour component
   const amPm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  const formattedTime = `${hours}:${minutes}`;
 

  return (
    <div className='conversation_container' onClick={() => navigate(`chats/${conversation._id }&${name}`)}>

        {/* <p className='con_icon'>{chatName[0]?.toUpperCase()}</p> */}
        <Avatar  className="con_icon" src={image} />
        <p className='con_title'>{chatName}</p>
        {/* <p className='con_title'>{conversation?.users?.lastName}</p> */}
        <p className='con_lastMessage text-xs'>{conversation?.lastMessage?.content ? conversation?.lastMessage?.content : "No Previous Messages, Click Here To Start A New Chat"}</p>
        <div className='flex justify-end items-end'>
        <p className='con_timeStamp'>{formattedTime}</p>     
        </div>
          
      
    </div>
  )
}

export default ConversationItem
