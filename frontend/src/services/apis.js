// const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = process.env.REACT_APP_API_URL;

export const authEndPoints = {
    SIGNUP_API : BASE_URL + "/api/v1/auth/signup",
    LOGIN_API : BASE_URL + "/api/v1/auth/login",
    GET_ALL_USERS_API : BASE_URL + "/api/v1/auth/getAllUsers",
}

export const profileEndPoints = {

    GET_ALL_USER_DETAILS_API : BASE_URL + "/api/v1/profile/getUserDetails",
    UPDATE_USER_DETAILS_API : BASE_URL + "/api/v1/profile/updateUserDetails",
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/api/v1/profile/updateDisplayPicture",
    REMOVE_IMAGE_API : BASE_URL + "/api/v1/profile/removeImage",
}

export const chatEndPoints = {

    ACCESS_CHAT_API : BASE_URL + "/api/v1/chat/accessChat",
    FETCH_ALL_CHATS_API : BASE_URL + "/api/v1/chat/fetchChats",
    FETCH_ALL_GROUPS_API : BASE_URL + "/api/v1/chat/fetchGroups",
    CREATE_GROUP_API : BASE_URL + "/api/v1/chat/createGroup",
    EXIT_GROUP_API : BASE_URL + "/api/v1/chat/exitGroup",
    ADD_SELF_TO_GROUP_API : BASE_URL + "/api/v1/chat/addSelfToGroup",
    SEND_MESSAGE_API : BASE_URL + "/api/v1/chat/sendMessage",
    GET_ALL_MESSAGES_API : BASE_URL + "/api/v1/chat/getAllMessages",

}