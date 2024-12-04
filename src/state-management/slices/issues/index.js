import {createSlice,  createAsyncThunk} from "@reduxjs/toolkit";

import {db} from "../../../services/firbase"
import {getDocs, collection} from "firebase/firestore";
import {FIRESTORE_PATH__NAMES} from "../../../core/constants/constants";

const initialState = {
    data: [],
    error: null,
    isLoading : false
}


export const fetchIssueData =  createAsyncThunk("data/fetchData", async ()=>{
    const queryData = await getDocs(collection(db, FIRESTORE_PATH__NAMES.ISSUES));

    //to do
    return queryData.docs.map(doc=> doc.data())

})

const IssueSlice =  createSlice({
    name: "issues",
    initialState,
    reducers :{

    },
    extraReducers:(promise)=>{
        promise.addCase(fetchIssueData.pending, (state)=>{
            state.loading=true;
        })
            .addCase(fetchIssueData.fulfilled, (state, action)=>{
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchIssueData.rejected, (state, action)=>{
                state.loading = false
                state.data = []
                state.error = action.payload
                console.log("fetchIssueData.rejected")
            })
    }
})

export default IssueSlice.reducer