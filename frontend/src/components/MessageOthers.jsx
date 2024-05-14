import React from 'react'
import "./Style.css"; 
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

const MessageOthers = ({props, image}) => {

   
    const theme = useSelector((state) => state.themeKey);
    const dateObj = new Date(props.createdAt);

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    // Determine AM/PM and adjust hour component
   const amPm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    const formattedTime = `${hours}:${minutes}`;

  return (
    <div className='others_message_container'>
        
       <div className='message_others_conversation_container flex items-start'>
        <div>
        {/* <p className='con_icon'>{props?.image}</p> */}
        <Avatar src={image} />
        </div>
            
            <div className="messageBox">
            <p className={`con_title`}>{props?.sender.firstName} {" "} {props?.sender?.lastName}</p>
            <p>{props?.content}</p>
          <p className='con_timeStamp'>{formattedTime}</p>
            
            </div> 
       </div>
    </div>
  )
}

export default MessageOthers
