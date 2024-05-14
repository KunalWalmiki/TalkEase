import { setConversations } from "../../redux/slices/userSlice";
import { apiConnector } from "../apiConnector";
import {chatEndPoints} from "../apis";
import {toast} from "react-hot-toast";

const {
    ACCESS_CHAT_API,
    CREATE_GROUP_API,
    FETCH_ALL_CHATS_API,
    FETCH_ALL_GROUPS_API,
    ADD_SELF_TO_GROUP_API,
    EXIT_GROUP_API,
    GET_ALL_MESSAGES_API,
    SEND_MESSAGE_API,

} = chatEndPoints;


export const accessChat = async(formData) => {

        // const toastId = toast.loading("Loading...!");
        // dispatch(setEdit(true));
        try {
    
            const response = await apiConnector("POST", ACCESS_CHAT_API, formData ,{
                Authorization : `Bearer ${sessionStorage.getItem("token")}`,
            });
    
            if(!response?.data?.success) {
                
                throw new Error(response?.data?.message);
    
            }
            // console.log(response);
    
            // toast.success("Chat Accessed Successfuly");
    
        } catch(error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    
        // toast.dismiss(toastId);
        // dispatch(setEdit(false));

}

export const fetchAllChats = async(search) => {

    // const toastId = toast.loading("Loading...!");
    // return async(dispatch) => {

        let  result = [];

    try {
         
        const response = await apiConnector("GET", FETCH_ALL_CHATS_API + "?search=" + search, null ,{
            Authorization : `Bearer ${sessionStorage.getItem("token")}`,
        });

        console.log(response);

        if(!response?.data?.success) {
            
            throw new Error(response?.data?.message);

        }

        result = response?.data?.chats
        sessionStorage.setItem("conversations", JSON.stringify(response?.data?.chats))
        // dispatch(setConversations(response?.data?.chats));
        // toast.success("fetched All Conversation Successfuly");

    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
   
    // toast.dismiss(toastId);
    return result;
    // }
}

export const createGroup = async(user, groupName, navigate) => {

        const toastId = toast.loading("Loading...!");
        
    try {
         
        const response = await apiConnector("POST", CREATE_GROUP_API, {user : user ,groupName : groupName} ,{
            Authorization : `Bearer ${sessionStorage.getItem("token")}`,
        });

        // console.log(response);

        if(!response?.data?.success) {
            
            throw new Error(response?.data?.message);

        }
       
        toast.success("Group Created Successfuly");
        navigate("/app/groups");

    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
   
    toast.dismiss(toastId);
}

export const fetchAvailableGroups = async() => {

    // const toastId = toast.loading("Loading...!");
    let result = [];
    try {
         
        const response = await apiConnector("GET", FETCH_ALL_GROUPS_API, null,{
            Authorization : `Bearer ${sessionStorage.getItem("token")}`,
        });

        // console.log(response);

        if(!response?.data?.success) {
            
            throw new Error(response?.data?.message);

        }

        result = response?.data?.allGroups;
        // toast.success("All Groups Fetched Successfuly");

    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
   
    // toast.dismiss(toastId);
    return result;

}

export const addSelftToGroup = async(chatId) => {


    return async(dispatch) => {

        const toastId = toast.loading("Loading...!");
        dispatch(setEdit(true));
        try {
         
            const response = await apiConnector("PUT", ADD_SELF_TO_GROUP_API, {chatId : chatId},{
                Authorization : `Bearer ${sessionStorage.getItem("token")}`,
            });
    
            // console.log(response);
    
            if(!response?.data?.success) {
                
                throw new Error(response?.data?.message);
    
            }
    
           
            toast.success("Added To Group Successfuly");
    
        } catch(error) {
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
       
        toast.dismiss(toastId);
        dispatch(setEdit(false));
    }
   
   

}

export const sendMessage = async(content, chat_id) => {

    // const toastId = toast.loading("Loading...!");
    let result = [];

    try {
         
        const response = await apiConnector("POST", SEND_MESSAGE_API,{content : content, chatId : chat_id},{
            Authorization : `Bearer ${sessionStorage.getItem("token")}`,
        });

        // console.log(response);

        if(!response?.data?.success) {
            
            throw new Error(response?.data?.message);

        }

       
        // toast.success("Message Sents Successfuly");
        result = response?.data?.message;

    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
   
    // toast.dismiss(toastId);
    return result;

}

export const getAllMessages = async(chat_id) => {

    // const toastId = toast.loading("Loading...!");
    let result = [];
    try {
         
        const response = await apiConnector("GET",`${GET_ALL_MESSAGES_API}/${chat_id} `, null, {
            Authorization : `Bearer ${sessionStorage.getItem("token")}`,
        });

        // console.log(response); 

        if(!response?.data?.success) {
            
            throw new Error(response?.data?.message);

        }

        result = response?.data?.allMessages
        // toast.success("All Messages Fetched Successfuly");
        

    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
    }
   
    // toast.dismiss(toastId);
    return result;

}



