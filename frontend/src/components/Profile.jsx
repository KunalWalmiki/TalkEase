import { Avatar, Button } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getUserDetails,
  removeImage,
  updateDisplayPicture,
  updateUserDetails,
} from "../services/operations/profile";
import { toast } from "react-hot-toast";
import { TableRowsTwoTone } from "@mui/icons-material";
import Spinner from "./Spinner";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Profile = () => {
  const theme = useSelector((state) => state.themeKey);
  const { user } = useSelector((state) => state.auth);
  const userData = JSON.parse(user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [removeProfileLoading, setRemoveProfileLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: `${userData?.firstName ? userData?.firstName : ""}`,
    lastName: `${userData?.lastName ? userData?.lastName : ""}`,
    bio: `${userData.bio ? userData?.bio : "Add Something To Your Bio"}`,
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await dispatch(getUserDetails());
    };

    fetchUserDetails();
  }, []);

  // console.log("file ->",file);

  // Event handler to update selected file name
  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]?.name || null);
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("File", file);

      const response = dispatch(updateDisplayPicture(formData));

      setSelectedFile(null);
    }
  };

  const fileInputRef = useRef(null);

  // Function to handle button click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateDetails = async () => {
    if (!formData.firstName || !formData.lastName || !formData.bio) {
      toast.warning("All Fields Are Required");
      return;
    }

    setLoading(true);
    const response = await dispatch(updateUserDetails(formData));
    setLoading(false);
  };

  const removeProfile = async () => {
    setRemoveProfileLoading(true);
    const response = await dispatch(removeImage());
    setRemoveProfileLoading(false);
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
        className="list_container "
      >
        <div className={`ug_header w-10/12 md:w-11/12 ${theme ? "dark" : ""}`}>
          <p className="ug_title unselectable">Profile</p>
        </div>

        <div
          className={`bg-white w-10/12 md:w-11/12 shadow-custom py-5 px-5 rounded-xl flex  mx-4 items-start ${
            theme ? "dark" : ""
          }`}
        >
          <div className="flex gap-x-5 gap-y-4 ">
            <Avatar className="" src={userData?.image} />
            <div className="flex items-center gap-x-4">
              <div className="flex items-center md:gap-x-5 gap-x-2">
                <button
                  className="flex items-center py-1 px-4 bg-yellow-400 text-black font-medium rounded-md
      hover:scale-95 transition-all duration-200"
                  onClick={handleButtonClick}
                  disabled={loading}
                >
                  Edit
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />{" "}
                <span>{selectedFile}</span>

                <Button
                  variant="contained"
                  disabled={removeProfileLoading}
                  onClick={removeProfile}
                >
                  {removeProfileLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Remove"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`bg-white w-10/12 md:w-11/12 shadow-custom mx-5 mt-5 rounded-md flex ${
            theme ? "dark text-white" : ""
          }`}
        >
          <div className="w-10/12 mx-auto flex items-center justify-center md:mb-10 mb-5">
            <form className="">
              <div className="flex flex-col md:flex-row gap-x-5  gap-y-4 p-5">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className={`text-black text-md font-medium ${
                      theme ? "text-white" : ""
                    }`}
                  >
                    {" "}
                    First Name <sup className="text-pink-700"> *</sup>{" "}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`border-[1px]  rounded py-1 px-2 font-medium ${
                      theme ? "dark border-white" : "border-black"
                    }`}
                    //  value={formData?.firstName}
                    defaultValue={formData?.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className={`text-black text-md font-medium ${
                      theme ? "text-white" : ""
                    }`}
                  >
                    {" "}
                    Last Name <sup className="text-pink-700"> *</sup>{" "}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`border-[1px] rounded py-1 px-2 font-medium ${
                      theme ? "dark border-white" : "border-black"
                    }`}
                    //  value={formData?.lastName}
                    defaultValue={formData?.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col px-4">
                <label
                  htmlFor=""
                  className={`text-black text-md font-medium ${
                    theme ? "text-white" : ""
                  }`}
                >
                  {" "}
                  Bio <sup className="text-pink-700"> *</sup>{" "}
                </label>
                <input
                  name="bio"
                  type="text"
                  className={`border-[1px] rounded py-1 px-2 font-medium max-w-[500px] ${
                    theme ? "dark border-white" : "border-black"
                  }`}
                  //  value={formData?.bio}
                  defaultValue={formData?.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-center justify-end mt-8 md:mb-10 px-4">
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={updateDetails}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Profile;
