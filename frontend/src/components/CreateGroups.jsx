import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { createGroup } from "../services/operations/chat";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/operations/auth";
import Spinner from "./Spinner";

const CreateGroups = () => {
  const theme = useSelector((state) => state.themeKey);
  const [groupName, setGroupName] = useState("");
  const { user } = useSelector((state) => state.auth);

  const userData = JSON.parse(user);

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {

      setLoading(true);
      const response = await getAllUsers({});
      setLoading(false);

      if (response) {
        setUsers(response);
      }
    };

    fetchUsers();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addGroup =  async() => {

    const groupUsers = [userData?.id, ...selectedUsers];
    const response = dispatch(createGroup(
      groupUsers,
      groupName,
      navigate
    ));

  };

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

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
        className="createGroup_container flex flex-col w-10/12"
      >
           <div className={`ug_header ${theme ? "dark" : ""}`}>
      <p className="ug_title unselectable">Create Group</p>
      </div>
          <label htmlFor=""
          className="text-md font-medium mt-5 px-10"
          > Group Name <span className="text-pink-700">*</span>
          <div className={`bg-white p-4 rounded-xl flex justify-between mt-2 ${theme ? "dark" : ""}`}>
          <input
            type="text"
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
            value={groupName}
            className={`outline-none ${theme ? "dark" : ""}`}
            placeholder="Enter Group Name"
          />
        </div>
        </label>

        <div className="px-10 mt-5">
          <p
          className="text-md text-center font-medium text-black"
          >Select Users</p>
          {
          loading ? 
          (
            <div className='flex mt-10 items-center justify-center'>
                <Spinner Color="text-black" />
            </div>
          )
          :
          (
          users && users.length > 0 ? (
            users.map((user, index) => {
              return (

                <label 
                key={index}
                className={`flex bg-white font-medium p-4 rounded-xl justify-between mt-2 ${theme ? "dark" : ""}`}
                >{user?.firstName} {" "} {user?.lastName}
                  <div >
                  
                    <input
                      type="checkbox"
                      id={`user-${user._id}`}
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                    />
                   
                  </div>
                  </label>
    
              );
            })
          ) 
          : 
          (
              <div className="grid place-content-center mt-4">
                No Users Found
              </div>
          ))
          }

          <div className="mt-4 text-center w-full">
              {
                  selectedUsers.length > 0 && (
                    <AnimatePresence>
                    <motion.div
                     initial={{ scale: 0, opacity: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0 }}
                     transition={{
                       ease: "anticipate",
                       duration: "0.3",
                     }}
                    >
                    <IconButton onClick={addGroup}>
                       <Button className="" variant="contained">Create</Button>
                    </IconButton>
                    </motion.div>
                    </AnimatePresence>
                   
                  )
              }
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateGroups;
