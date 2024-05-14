import React, { useEffect, useState } from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchAllChats } from '../services/operations/chat';
import ConversationItem from './ConversationItem';
import Spinner from './Spinner';
import { setConversations } from '../redux/slices/userSlice';

const SmallScreenChats = () => {

  const theme = useSelector((state) => state.themeKey);
  const {user} = useSelector((state) => state.auth);
  const userData = JSON.parse(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {conversations} = useSelector((state) => state.auth);
  const conversationData = JSON.parse(conversations);

  console.log(conversationData);

  useEffect(() => {
    const fetchConversations = async() => {

        setLoading(true);
        const response = await fetchAllChats({})
        setLoading(false);
        if(response) {
            
            // setConversations(response);
            dispatch(setConversations(JSON.stringify(response)));

        }

    }
    

    fetchConversations();

  }, []);


  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="list_container "
      >
        <div className={`ug_header ${theme ? "dark" : ""}`}>
          <p className="ug_title unselectable">chats</p>
        </div>
          
            <div className={`sd_conversation1 min-h-[200px] ${theme ? "dark" : ""}`}>
            {
                loading ? 
                (
                  <div className='flex mt-10 items-center justify-center'>
                      <Spinner Color="text-black"/>
                  </div>
                )
                : 
                (
                conversationData && conversationData.length > 0 ? (
                  conversationData.map((conversation, index) => {
                    var chatName = "";
                    var image= "";
                    if(conversation?.isGroupChat) {
                       chatName = conversation.chatName;

                      } else {
                       conversation.users.map((user) => {
                        if(user._id != userData.id) {
                          chatName = user?.firstName + " " + user?.lastName;
                          image = user?.image;
                        }
                       
                       })
                      }

                    return (<ConversationItem key={index} conversation={conversation} chatName={chatName} image={image}/>)
                }))
                : 
                (
                     <div className='grid place-content-center font-medium text-md mt-20'>
                          No User Found
                     </div>
                )
                ) 
            }
          </div>         
      </motion.div>
    </AnimatePresence>
  )
}

export default SmallScreenChats
