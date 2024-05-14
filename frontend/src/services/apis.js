// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const authEndPoints = {
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    GET_ALL_USERS_API : BASE_URL + "/auth/getAllUsers",
}

export const profileEndPoints = {

    GET_ALL_USER_DETAILS_API : BASE_URL + "/profile/getUserDetails",
    UPDATE_USER_DETAILS_API : BASE_URL + "/profile/updateUserDetails",
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    REMOVE_IMAGE_API : BASE_URL + "/profile/removeImage",
}

export const chatEndPoints = {

    ACCESS_CHAT_API : BASE_URL + "/chat/accessChat",
    FETCH_ALL_CHATS_API : BASE_URL + "/chat/fetchChats",
    FETCH_ALL_GROUPS_API : BASE_URL + "/chat/fetchGroups",
    CREATE_GROUP_API : BASE_URL + "/chat/createGroup",
    EXIT_GROUP_API : BASE_URL + "/chat/exitGroup",
    ADD_SELF_TO_GROUP_API : BASE_URL + "/chat/addSelfToGroup",
    SEND_MESSAGE_API : BASE_URL + "/chat/sendMessage",
    GET_ALL_MESSAGES_API : BASE_URL + "/chat/getAllMessages",

}