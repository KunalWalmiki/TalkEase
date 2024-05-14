import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useDispatch, useSelector } from "react-redux";
import {motion, AnimatePresence} from "framer-motion"
import axios from "axios";
import { getAllUsers } from "../services/operations/auth";
import { accessChat, fetchAllChats } from "../services/operations/chat";
import Spinner from "./Spinner";
import { useDebounce } from "../hooks/useDebounce";
import { setConversations } from "../redux/slices/userSlice";


const Users = () => {

  const theme = useSelector((state) => state.themeKey);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const value = useDebounce(search);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    
    const fetchUsers = async() => {

      setLoading(true);
      const response = await getAllUsers(value);
      setLoading(false);
      if(response) {
        setUsers(response);
      }
      

    }
    

    fetchUsers();

  },[value]);

  const dispatch = useDispatch();
  const createChat = async(userId) => {

    // console.log(userId);
      const response = await accessChat(userId);

      const result = await fetchAllChats(value);
  
      dispatch(setConversations(JSON.stringify(result)));

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
      className="list_container">
      <div className={`ug_header ${theme ? "dark" : ""}`}>
        <p className="ug_title unselectable">Available Users</p>
      </div>
      <div className={`sd_search ${theme ? "dark" : ""}`}>
        <IconButton>
          <SearchSharpIcon className={`${theme ? "dark" : ""}`}/>
        </IconButton>
        <input 
        placeholder="Search" 
        className="search_box unselectable" 
        name="search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
        />
      </div>

      <div className="listItem_container min-h-[200px] overflow-y-auto overflow-x-hidden">
        {
                      loading ? 
                      (
                        <div className='flex mt-10 items-center justify-center'>
                            <Spinner Color="text-black"/>
                        </div>
                      )
                      :
                      (
                         users && users.length > 0 ? (
                                users?.map((user, index) => (

                                    <motion.div 
                                    whileHover={{scale : 1.01}}
                                    whileTap={{scale : 0.98}}
                                    className={`conversation_container userGroup_container ${theme ? "dark" : ""}`}  key={index}
                                    onClick={() => createChat({userId : user?._id, name : user?.firstName + " " +user?.lastName})}
                                    >

                                    <Avatar  className="" src={user?.image} />
                                    {/* <p className='con_icon unselectable'>{user?.image}</p> */}
                                    <div className="flex items-center gap-x-2">
                                    <p className='con_title unselectable'>{user?.firstName}</p>
                                    <p className='con_title unselectable'>{user?.lastName}</p>
                                    </div>
                                    
                                    </motion.div>

                                ))
                              
                        ) : (

                          <div className="grid place-content-center mt-4">
                            No Users Found
                          </div>

                        )
                      )
                    }
      </div>
    </motion.div>
    </AnimatePresence>
    
  );
};

export default Users;
