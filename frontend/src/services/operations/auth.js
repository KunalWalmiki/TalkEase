import { apiConnector } from "../apiConnector";
import { authEndPoints } from "../apis";
import {toast} from "react-hot-toast";
import { setToken, setUser } from "../../redux/slices/userSlice";


const {
    SIGNUP_API,
    LOGIN_API,
    GET_ALL_USERS_API,
    
} = authEndPoints;


export const signup = async(formData, navigate) => {

    const toastId = toast.loading("Loading...!");

    try {

        const response = await apiConnector("POST", SIGNUP_API, formData);

        if(!response?.data?.success) {

            throw new Error(response?.data?.message);

        }

        toast.success("Account Created Successfuly");
        navigate("/");


    } catch(error) {

        console.log(error);
        toast.error(error?.response?.data?.message);

    }

    toast.dismiss(toastId);

}

export const login = (formData, navigate, dispatch) => {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...!");
        try {

            const response = await apiConnector("POST", LOGIN_API, formData);
    
            if(!response?.data?.success) {
    
                throw new Error(response?.data?.message);
    
            }

            navigate("/app/welcome");
            toast.success("Logged In Successfuly");
            console.log(response);
            sessionStorage.setItem('token', response?.data?.token);
            dispatch(setToken(response?.data?.token));
            dispatch(setUser(JSON.stringify(response?.data?.user)));
            sessionStorage.setItem('user', JSON.stringify(response?.data?.user));
        
    
        } catch(error) {
    
            console.log(error);
            toast.error(error?.response?.data?.message);
    
        }

        
        toast.dismiss(toastId);
    }

}

export const getAllUsers = async(search) => {

    // const toastId = toast.loading("Loading...!");
    let result = [];
    try {
        
        const response = await apiConnector("GET", GET_ALL_USERS_API + "?search=" + search, null, {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json',
        });

        if(!response?.data?.success) {

            throw new Error(response?.data?.message);

        }

        result = response?.data?.users
        console.log(response);

    } catch(error) {

        console.log(error);
        toast.error(error?.response?.data?.message);

    }
  
    // toast.dismiss(toastId);
    return result;

}

export const logout = (navigate) => {

    return async(dispatch) => {

        sessionStorage.setItem("token", "");
        sessionStorage.setItem("user", "");
        dispatch(setToken(null));
        dispatch(setUser(null));
        toast.success("Logged Out");
        navigate("/");
    }
    

} 

