import {createSlice,  createAsyncThunk} from "@reduxjs/toolkit";

import {db} from "../../../services/firbase"
import {getDocs, collection} from "firebase/firestore";
import {FIRESTORE_PATH__NAMES} from "../../../core/constants/constants";
import {transformIssueData} from "../../../core/helpers/transformissuedata";








const initialState = {
    data: {},
    error: null,
    isLoading : false
}


export const fetchIssueData =  createAsyncThunk("data/fetchData", async ()=>{
    const queryData = await getDocs(collection(db, FIRESTORE_PATH__NAMES.ISSUES));

    //to do
    const resultData =  queryData.docs.map(doc=> doc.data())



    return transformIssueData(resultData)
})

const IssueSlice =  createSlice({
    name: "issues",
    initialState,
    reducers :{

    },
    extraReducers:(promise)=>{
        promise.addCase(fetchIssueData.pending, (state)=>{
            state.isLoading=true;
        })
            .addCase(fetchIssueData.fulfilled, (state, action)=>{
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchIssueData.rejected, (state, action)=>{
                state.isLoading = false
                state.data = []
                state.error = action.payload
                console.log("fetchIssueData.rejected")
            })
    }
})

export default IssueSlice.reducer