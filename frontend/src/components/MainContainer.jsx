import React, { useState } from 'react'
import "./Style.css"; 
import SideBar from './SideBar';
import ChatArea from './ChatArea';
import Welcome from './Welcome';
import CreateGroups from './CreateGroups';
import UserGroups from './Users';
import { Outlet } from 'react-router-dom';
// import WorkArea from './WorkArea';

const MainContainer = () => {

  return (
    <div className='main_container h-screen'>
        <SideBar />
        <Outlet />
        {/* <WorkArea/> */}
        {/* <ChatArea conversation={{name : "kunal walmiki", timeStamp : "Today"}}/> */}
        {/* <Welcome/> */}
        {/* <CreateGroups/> */}
        {/* <UserGroups/> */}
    </div>
  )
}

export default MainContainer
