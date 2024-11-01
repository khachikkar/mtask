import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
}

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers :{
        increment: (state)=>{
            state.count += 1
        },
        decrement: (state)=>{
            state.count -= 1
        },
    }

})

export const {increment, decrement} = userProfileSlice.actions
export  default  userProfileSlice.reducer