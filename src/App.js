import MainLayout from "./components/Layout/Main";
import LoadingWraper from "./components/shared/LoadingWraper";


import { Login, Register } from "./pages/auth";

import "antd/dist/reset.css";


import {  FIRESTORE_PATH__NAMES, ROUTE_CONSTANTS } from "./core/constants/constants";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import Intro from "./components/Intro";
import Cabinet from "./pages/Cabinet";
import Profile from "./pages/profile";

import { useEffect, useState } from "react";


import { auth, db } from "./services/firbase";

import { onAuthStateChanged } from "firebase/auth/cordova";


import { AuthContext } from "./Context/authContext";


// geting a data of logined user
import {doc, getDoc} from "firebase/firestore"

import "./styles/global.css";


const App = () => {

  const [isAuth, setIsAuth] = useState(false) // lucum enq login cabinet ejer qcelu logic y
  const [loading, setLoading] = useState(true)
  const [userProfileInfo, setUserProfileInfo] = useState({})

const handleGetUserData = async (uid)=>{
  const docRef = doc(db, FIRESTORE_PATH__NAMES.REGISTERED_USERS, uid) // vercnum enq hamapatasxan uid ov datan
  const response = await getDoc(docRef)
    if(response.exists()){
      // console.log(response.data())
      setUserProfileInfo(response.data())
    }
}


useEffect(()=>{
  onAuthStateChanged(auth, (user)=>{
    user?.uid && handleGetUserData(user.uid)
    
// console.log(user)

    setLoading(false)
    setIsAuth(Boolean(user))
    // console.log(user, ">>>>>>")
  })
},[])



  return (
    <AuthContext.Provider value={{isAuth, userProfileInfo}}>
    <LoadingWraper loading={loading}> 
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
            <Route path={ROUTE_CONSTANTS.INTRO} element={<Intro />} />
            <Route path={ROUTE_CONSTANTS.PROFILE} element={ isAuth ? <Profile /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
            <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth} />} />
            <Route path={ROUTE_CONSTANTS.REGISTER} element={ isAuth ?  <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />} />
            <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
          </Route>
        )
      )}
    />
    </LoadingWraper>  
    </AuthContext.Provider> // stexcum enq context props chain chanelu hamar
  );
};

export default App;
