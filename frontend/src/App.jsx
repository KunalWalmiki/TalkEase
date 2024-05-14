import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainContainer from './components/MainContainer'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import { Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome'
import UserGroups from './components/Users'
import ChatArea from './components/ChatArea'
import CreateGroups from './components/CreateGroups'
import AvailableGroups from './components/AvailableGroups'
import Users from './components/Users'
import PrivateRoute from './components/auth/PrivateRoute'
import Profile from './components/Profile'
import SmallScreenChats from './components/SmallScreenChats'


function App() {

  return (
    <>
       <div className='app'>

        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Login/>}/>
            <Route  path="app" element={
            <PrivateRoute>
            <MainContainer/>
            </PrivateRoute>
            }>
              <Route path="welcome" element={<Welcome/>}/>
              <Route path="groups" element={<AvailableGroups/>}/>
              <Route path="users" element={<Users/>}/>
              <Route path="chats/:id" element={<ChatArea/>}/>
              <Route path="schats/chats/:id" element={<ChatArea/>}/>
              <Route path="create-groups" element={<CreateGroups/>}/>
              <Route path={"profile"} element={<Profile/>}/>
              <Route path={"schats"} element={<SmallScreenChats/>}/>
            </Route>
        </Routes>
         {/* <Signup/> */}
         {/* <Login/> */}
       </div>
    </>
  )
}


export default App
