import React, { useState } from "react";
import InputBox from "./InputBox";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { signup } from "../../services/operations/auth";



const Signup = () => {
    
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
    })

    console.log(formData);

    const handleSubmit = async() => {

      const {firstName, lastName, email, password} = formData;

      if(!firstName | !lastName | !email | !password) {
          toast.error("All Fields Are Required");
          return;
      }

      const result = await signup({firstName, lastName, email, password}, navigate);

    }

  return (
    <div className="flex items-center justify-center overflow-hidden">
      <div className=" w-10/12 mx-auto  flex flex-col items-center">
      <p className="font-extrabold text-2xl md:text-4xl ">Create An Account</p>
      <div className=" flex gap-x-1 mt-2">
      <p className="text-md text-slate-500 text-center">
        Already Have An Account? 
      </p>
      <Link to="/" className="underline">Login</Link>
      </div>
      {/* <form className="mt-5 flex flex-col gap-y-5"> */}
        <div className="flex flex-col md:flex-row gap-x-5 gap-y-4 mt-5">
          <div className="">
          <InputBox
           label={"FirstName"}
           type={"text"}
           onchange={(e) => {
            setFormData((prev) => {
              return {
                ...prev,
                firstName : e.target.value,
              }
            })
           }}
           />
          </div>

          <div className="">
          <InputBox
           label={"Last Name"}
           type={"text"}
           onchange={(e) => {
            setFormData((prev) => {
              return {
                ...prev,
                lastName : e.target.value,
              }
            })
           }}
           />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-x-5 gap-y-2 mt-4">
          <div className="">
          <InputBox
           label={"Email"}
           type={"text"}
           onchange={(e) => {
            setFormData((prev) => {
              return {
                ...prev,
                email : e.target.value,
              }
            })
           }}
           />
          </div>

          <div className="">
           <InputBox
           label={"Password"}
           type={"password"}
           onchange={(e) => {
            setFormData((prev) => {
              return {
                ...prev,
                password : e.target.value,
              }
            })
           }}
           />
          </div>
        </div>

        <button 
        type="button" 
        onClick={handleSubmit}
        className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Account</button>
      {/* </form> */}
      </div>
    </div>
  );
};

export default Signup;
