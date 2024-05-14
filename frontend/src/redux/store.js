import {configureStore} from "@reduxjs/toolkit";
import themeSliceReducer from './slices/themeSlice';
import userSliceReducer from "./slices/userSlice";

export const store = configureStore({
    reducer : {
       themeKey : themeSliceReducer,
       auth : userSliceReducer,
    }
})