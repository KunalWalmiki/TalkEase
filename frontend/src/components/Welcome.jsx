import React from 'react'
import { useSelector } from 'react-redux'
import Logo from "../assets/Logo1.png";


const Welcome = () => {

  const {user} = useSelector((state) => state.auth);
 
  return (
    <div className='flex items-center justify-center w-full mx-2'>
         <div>
              <img src={Logo} alt="" width={400} height={300} />
              <p
              className='text-md font-medium font-serif text-center'
              >View And Text Directly To People present In The Chat Rooms</p>
         </div>
    </div>
  )
}

export default Welcome
