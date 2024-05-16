import React from 'react'
import "./Style.css"; 

const MessageSelf = ({props}) => {

  const dateObj = new Date(props.createdAt);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  // Determine AM/PM and adjust hour component
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight

  const formattedTime = `${hours}:${minutes}`;

  return (
    <div className='self_message_container'>
       
        {/* <div className='conversation_container'> */}
            <div>
            <div className="selfmessageBox">
            <p  className='text-xs font-medium md:text-md'>You</p>
            <p
             className='text-xs font-medium md:text-md'
            >{props?.content}</p>
            <div>
            <p className='con_timeStamp'>{formattedTime}</p>
            </div>
           
            </div>
       {/* </div> */}
        </div>
    </div>
  )
}

export default MessageSelf
