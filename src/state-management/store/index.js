import {configureStore} from "@reduxjs/toolkit";
import userProfileReducer from "../slices/userProfile";


export const store = configureStore({
reducer:{
    userProfile : userProfileReducer
}
})
