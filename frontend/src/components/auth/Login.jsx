import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputBox from './InputBox'
import toast from 'react-hot-toast'
import { login } from '../../services/operations/auth'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const [formData, setFormData] = useState({
    email : "",
    password : "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async() => {

    const {email, password} = formData;

    if(!email | !password) {

      toast.error("All Fields Are Required");
      return;

    }

     setFormData({email : "", password : ""});
     setLoading(true);
     await dispatch(login({email, password}, navigate));
     setLoading(false);

  }

  return (
    <div className='flex items-center justify-center overflow-hidden'>
      <div className=" w-10/12 mx-auto  flex flex-col items-center">

    <p className='font-extrabold text-2xl md:text-4xl'>Login</p>
    <div className=" flex gap-x-1 mt-2">
      <p className="text-md text-slate-500 text-center">
        Don't Have An Account? 
      </p>
      <Link to="/signup" className="underline">Sign Up</Link>
      </div>

        <div className='flex flex-col  gap-x-5 gap-y-4 mt-5'>
          
         <InputBox 
         label={"Email"}
         type="email"
         value={formData.email}
         onchange={(e) => {
          setFormData((prev) => {
            return {
              ...prev,
              email : e.target.value
            }
          })
         }}
         />

         <InputBox
         label={"Password"}
         type="password"
         value={formData.password}
         onkeydown = {(event) => {

          if(event.code == "Enter") {

            handleSubmit();
    
          }
       
         }}
         onchange={(e) => {
          setFormData((prev) => {
            return {
              ...prev,
              password : e.target.value
            }
          })
         }}
         />
  
         <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          inputProps={{
            style: {
              marginTop : "10px", // Set text color to white
            }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>
               
        </div>
</div>

</div>
  )
}

export default Login
