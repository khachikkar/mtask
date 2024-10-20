import MainLayout from "./components/Layout/Main";
import LoadingWraper from "./components/shared/LoadingWraper";


import { Login, Register } from "./pages/auth";

import "antd/dist/reset.css";

import "./styles/global.css";

import { ROUTE_CONSTANTS } from "./core/constants/constants";

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


import { auth } from "./services/firbase";
import { onAuthStateChanged } from "firebase/auth/cordova";


import { AuthContext } from "./Context/authContext";


const App = () => {

  const [isAuth, setIsAuth] = useState(false) // lucum enq login cabinet ejer qcelu logic y
  const [loading, setLoading] = useState(true)
useEffect(()=>{
  onAuthStateChanged(auth, (user)=>{
    setLoading(false)
    setIsAuth(Boolean(user))
    console.log(user, ">>>>>>")
  })
},[])


// const [nameD, setNameD] = useState("NOthing Nothingyan")
// const [gmail, setGmail] =useState("")
  return (
    <AuthContext.Provider value={{isAuth}}>
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
