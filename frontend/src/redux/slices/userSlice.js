import { createSlice } from "@reduxjs/toolkit";

let initialState = {

    token : sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null,
    user : sessionStorage.getItem("user") ? sessionStorage.getItem("user") : null,
    edit : false,
    conversations : sessionStorage.getItem("conversations") ?  sessionStorage.getItem("conversations") : null,
}

export const userSlice = createSlice({

    name : "auth",
    initialState : initialState,
    reducers : {
           setUser : (state, action) => {
               state.user = action.payload;
           }, 
           setToken : (state, action) => {
               state.token = action.payload;
           },
           setConversations : (state, action) => {
               state.conversations = action.payload;
           }
    }
});


export const {setUser, setToken, setConversations} = userSlice.actions;
export default userSlice.reducer;
