import { setUser } from "../../redux/slices/userSlice";
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";
import {toast} from "react-hot-toast";


const {

    GET_ALL_USER_DETAILS_API,
    UPDATE_USER_DETAILS_API,
    UPDATE_DISPLAY_PICTURE_API,
    REMOVE_IMAGE_API,

} = profileEndPoints



export const getUserDetails = () => {

    return async(dispatch) => {

        // const toastId = toast.loading("Loading...!");

        try {

            const response = await apiConnector("GET", GET_ALL_USER_DETAILS_API, null, {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            });
    
            if(!response.data.success) {
    
                throw new Error(response?.data?.message);
    
            }
    
            // console.log(response);
            // toast.success("User Details Fetched Successfuly");
            sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
            dispatch(setUser(JSON.stringify(response?.data?.user)));
    
        } catch(error) {
    
            console.log(error);
            toast.error(error?.response?.data?.message);
    
        }
        // toast.dismiss(toastId);
    }

    

    
    

}

export const updateUserDetails = (formData) => {
    
    return async(dispatch) => {

        // const toastId = toast.loading("Loading...!");

        try {

            const response = await apiConnector("PUT", UPDATE_USER_DETAILS_API, formData, {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            });
    
            if(!response.data.success) {
    
                throw new Error(response?.data?.message);
    
            }
    
            // console.log(response);
            // toast.success("User Details Updated Successfuly");
            sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
            dispatch(setUser(JSON.stringify(response?.data?.user)));
    
        } catch(error) {
    
            console.log(error);
            toast.error(error?.response?.data?.message);
    
        }
        // toast.dismiss(toastId);
    }

}

export const updateDisplayPicture = (formData) => {

        
        return async(dispatch) => {

            const toastId = toast.loading("Loading...!");

            try {

                const response = await apiConnector(
                "PUT",
                 UPDATE_DISPLAY_PICTURE_API, 
                 formData, 
                 {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                });
        
                if(!response.data.success) {
        
                    throw new Error(response.data.message);
        
                }
    
                toast.success("Profile Picture Updated");
                sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
                dispatch(setUser(JSON.stringify(response?.data?.user)));

        
            } catch(error) {
        
                console.log(error);
                toast.error(error.response.data.message);
        
            }
            toast.dismiss(toastId);
        }
       
        

}

export const removeImage = (formData) => {

    return async(dispatch) => {

        
    // const toastId = toast.loading("Loading...!");
        try {

            const response = await apiConnector(
            "PUT",
            REMOVE_IMAGE_API, 
             null, 
             {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'multipart/form-data'
            });
    
            if(!response?.data?.success) {
    
                throw new Error(response.data.message);
    
            }

            toast.success("Profile Picture Updated");
            sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
            dispatch(setUser(JSON.stringify(response?.data?.user)));

    
        } catch(error) {
    
            console.log(error);
            toast.error(error?.response?.data?.message);
    
        }
        // toast.dismiss(toastId);
    }
   
    

}