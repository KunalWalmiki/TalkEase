import React, { useEffect, useState } from 'react'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Icon, IconButton } from '@mui/material';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import NightlightRoundSharpIcon from '@mui/icons-material/NightlightRoundSharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import ConversationItem from './ConversationItem';
import "./Style.css"; 
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/slices/themeSlice';
import { fetchAllChats } from '../services/operations/chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../services/operations/auth';
import ChatIcon from '@mui/icons-material/Chat';
import { useDebounce } from '../hooks/useDebounce';
import { SearchOff } from '@mui/icons-material';
import Spinner from './Spinner';
import { setConversations } from '../redux/slices/userSlice';

const SideBar = () => {

    const {user} = useSelector((state) => state.auth);
    const theme = useSelector((state) => state.themeKey);
    const userData = JSON.parse(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {edit} = useSelector((state) => state.auth);
    const [search, setSearch] = useState("");
    const value = useDebounce(search);
    const [loading, setLoading] = useState(false);
    const {conversations} = useSelector((state) => state.auth);
    const conversationData = JSON.parse(conversations);

    useEffect(() => {

      const fetchConversations = async() => {

          setLoading(true);
          const response = await fetchAllChats(value);
          setLoading(false);

          if(response) {
              
              dispatch(setConversations(JSON.stringify(response)));

          }

      }

      fetchConversations();

    }, [value])
  

  return (
    <div className="sidebar-container unselectable">
          <div className={`sd_header ${theme ? "dark" : ""}`}>
            <div>
            <IconButton onClick={() => navigate("profile")}>
            <AccountCircleSharpIcon className={`icon ${theme ? "dark" : ""}`}/>
            </IconButton>
            </div>

            <div>
            <div className='md:hidden sm:hidden'>
            <IconButton onClick={() => navigate("schats")} className="hidden">
            <ChatIcon className={`icon ${theme ? "dark" : ""} hidden `}/>
            </IconButton>
            </div>
            <IconButton onClick={() => navigate("users")}>
            <PersonAddAltSharpIcon className={`icon ${theme ? "dark" : ""}`}/>
            </IconButton>

            <IconButton onClick={() => navigate("groups")}>
            <GroupAddSharpIcon className={`icon ${theme ? "dark" : ""}`}/>
            </IconButton>

            <IconButton onClick={() => navigate("create-groups")}>
            <AddCircleOutlineSharpIcon className={`icon ${theme ? "dark" : ""}`}/>
            </IconButton>

            <IconButton onClick={() => {dispatch(toggleTheme())}}>
              { !theme && <NightlightRoundSharpIcon className={`icon ${theme ? "dark" : ""}`}/>}
              { theme && <LightModeIcon className={`icon ${theme ? "dark" : ""}`}/>}
            </IconButton> 

            <IconButton onClick={() => dispatch(logout(navigate))}>
            <LogoutIcon className={`icon ${theme ? "dark" : ""}`}/>
            </IconButton>

            </div>
         
            
          </div>
          <div className={`sd_search ${theme ? "dark" : ""}`}>
            <IconButton>
            <SearchSharpIcon className={`icon ${theme ? "dark" : ""}`}/>
            </IconButton>
            <input 
            placeholder='Search' 
            className={`search_box ${theme ? "dark" : ""}`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            />
          </div>
          <div className={`sd_conversation ${theme ? "dark" : ""}`}>
            {

              loading ? 
              (
                <div className='flex mt-10 items-center justify-center'>
                    <Spinner Color="text-black"/>
                 </div>
              )
              :
              (
                conversationData && 
                conversationData.length > 0 ?
                (
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
              })
              )
              : 
              (
                  <div className='grid place-content-center mt-4'>
                        No Users Found
                  </div>
              )
            )
            }
          </div>
    </div>
  )
}

export default SideBar
