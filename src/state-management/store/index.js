import {configureStore} from "@reduxjs/toolkit";
import userProfileReducer from "../slices/userProfile";
import issuesReducer from "../slices/issues";
import usersReducer from "../slices/allUsers";

export const store = configureStore({
reducer:{
    userProfile : userProfileReducer,
    issues: issuesReducer,
    users: usersReducer
}
})
