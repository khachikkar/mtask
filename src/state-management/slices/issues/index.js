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
    //organizeing Issue change column functionalioty
    reducers :{
changeIssueColumns: ( state, action)=>{
    // structured sorted data
    const columns = state.data
    // destructured source and destination objects from action payload
    const {source, destination} = action.payload
    //the column array which belongs to source // vortexic vor brnel enq
    const sourceColumnItems = [...columns[source.droppableId]]
    // the dest array where we want to add
    const destinationColumnItems = [...columns[destination.droppableId]]

// the item that we are drged
const [removedItem] = sourceColumnItems.splice(source.index, 1)

// the doped area we put a where, from , and what
destinationColumnItems.splice(destination.index, 0, removedItem)

    // finished data
    let changedColumn = {}

    // updated data
    if(source.droppableId !== destination.droppableId ){
        changedColumn = {
            ...columns,
            [source.droppableId]: sourceColumnItems,
            [destination.droppableId]: destinationColumnItems
        }
    }else{
        sourceColumnItems.splice(destination.droppableId, 0, removedItem)
        changedColumn = {
            ...columns,
            [source.droppableId]: sourceColumnItems,
        }
    }

    console.log(JSON.parse(JSON.stringify({changedColumn})))

    //set updated data
    state.data = changedColumn
}
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

export const  {changeIssueColumns}  =  IssueSlice.actions
export default IssueSlice.reducer