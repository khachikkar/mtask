import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../services/firbase";
import {FIRESTORE_PATH__NAMES} from "../../../core/constants/constants";


const initialState = {
    users: [],
    isLoading: null
}

export const fetchallUsers = createAsyncThunk("users/fetchusers", async()=>{
    const queryData = await getDocs(collection(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS))
    const resultData =  queryData.docs.map(doc=> doc.data())

    console.log(resultData, "resData")
    return resultData
})



const allUsersSlice= createSlice({
    name: "allUsers",
    initialState,
    reducers: {},
    extraReducers: (promise)=>{
        promise
            .addCase(fetchallUsers.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(fetchallUsers.fulfilled, (state, action)=>{
                state.isLoading = false
                ///////
                state.users = action.payload
            })
            .addCase(fetchallUsers.rejected, (state)=>{
                state.isLoading = false
                state.data = []
                console.log("fetchAllUsers rejected")
            })
    }
})


export default allUsersSlice.reducer