import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// createAsyncTrunk  imorting for promise
import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "../../../services/firbase";
import {doc, getDoc} from "firebase/firestore";
import {FIRESTORE_PATH__NAMES} from "../../../core/constants/constants";



const initialState = {
loading : true,
authUserInfo: {
    isAuth: false,
    userData : {}
},
error: null
}

// create a  function to fetch user data with createaAsyncThunk, that return promise with function in parameters resolve and reject.
//it call onAuth.. function and say if user is true disctruct uid and doc it
//after it getdoc  it return prmise which then say if .exist


export const fetchUserProfileInfo = createAsyncThunk("data/fetchUserProfileInfo", async()=>{
    return new Promise((resolve, reject)=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                const {uid} = user
                const userRef = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid)
                getDoc(userRef)
                    .then((userData)=>{
                       if(userData.exists()) {
                            resolve(userData.data())
                       }else{
                            resolve(null) // "TODO"
                        }
                    })

            }else{
                reject("Oops")
            }
        })
    })
})


//on extraReducer functionality return function with promise argument and return .addCase many
// it return 3 case prndinf, reject and fullfilied  so each Case do their action ,
//state is my initial state,  and action.payload is  resolved values  on function , rejection is rejected values


const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers :{ // todo
        setIsAuth: (state, action)=>{
            state.authUserInfo.isAuth = action.payload
        }
    },
    extraReducers: (promise)=>{
promise
    .addCase(fetchUserProfileInfo.pending, (state)=>{
    state.loading = true
    })
    .addCase(fetchUserProfileInfo.fulfilled, (state, action)=>{
    state.loading = false
    state.authUserInfo.userData = action.payload
    state.authUserInfo.isAuth = true
    })
    .addCase(fetchUserProfileInfo.rejected, (state, action)=>{
    state.loading = false
    state.error = action.payload
    state.authUserInfo.userData = {}
    state.authUserInfo.isAuth = false
    })
    }

})

export const {setIsAuth} = userProfileSlice.actions
export  default  userProfileSlice.reducer