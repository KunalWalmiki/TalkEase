import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useSelector } from 'react-redux';
import {motion, AnimatePresence} from 'framer-motion';
import { addSelftToGroup, fetchAvailableGroups } from '../services/operations/chat';
import Spinner from './Spinner';

const AvailableGroups = () => {

      const [availableGroups, setAvailableGroups] = useState([]); 
      const theme = useSelector((state) => state.themeKey);
      const [loading, setLoading] = useState(false);

      useEffect(() => {

          const fetchGroups = async() => {
               
               setLoading(true);
               const response = await fetchAvailableGroups();
               setLoading(false);

               if(response) {

                  setAvailableGroups(response);

               }
          }

          fetchGroups();

      }, [])


      const addToGroup = async(groupId) => {

          const response = await addSelftToGroup(groupId);
          
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
      <p className="ug_title unselectable">Available Groups</p>
    </div>
    <div className={`sd_search ${theme ? "dark" : ""}`}>
      <IconButton>
        <SearchSharpIcon className={`${theme ? "dark" : ""}`}/>
      </IconButton>
      <input placeholder="Search" className={`search_box unselectable ${theme ? "dark" : ""}`}/>
    </div>

    <div className="listItem_container min-h-[200px]">
      {
                      
                      loading ? 
                      (
                        <div className='flex mt-10 items-center justify-center'>
                           <Spinner Color="text-black"/>
                        </div>
                      )
                      : 
                      (
                      availableGroups && availableGroups.length > 0 ? (
                        availableGroups?.map((group, index) => (

                                  <motion.div 
                                  whileHover={{scale : 1.01}}
                                  whileTap={{scale : 0.98}}
                                  onClick={() => addToGroup(group?._id)}
                                  className={`conversation_container userGroup_container ${theme ? "dark" : ""}`} key={index}>

                                  <p className='con_icon unselectable'>{group?.chatName[0]}</p>
                                  <p className='con_title unselectable'>{group?.chatName}</p>
                                  </motion.div>

                              ))
                            
                      ) 
                      :
                      (
                          <div className='grid place-content-center mt-4'>
                             No Available Groups Found
                          </div>
                      )
                    )
                  }
    </div>
     </motion.div>
    </AnimatePresence>
   
  )
}

export default AvailableGroups
