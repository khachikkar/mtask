import MainLayout from "./components/Layout/Main";
// import Login from "./pages/auth/login";
// import Register from "./pages/auth/register";

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
import { useEffect, useState } from "react";


import { auth } from "./services/firbase";
import { onAuthStateChanged } from "firebase/auth/cordova";

const App = () => {

  const [isAuth, setIsAuth] = useState(false) // lucum enq login cabinet ejer qcelu logic y

useEffect(()=>{
  onAuthStateChanged(auth, (user)=>{
    setIsAuth(Boolean(user))
    console.log(user, ">>>>>>")
  })
},[])


  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
            <Route path={ROUTE_CONSTANTS.INTRO} element={<Intro />} />
            <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login setIsAuth={setIsAuth} />} />
            <Route path={ROUTE_CONSTANTS.REGISTER} element={ isAuth ?  <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />} />
            <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <Cabinet /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />} />
          </Route>
        )
      )}
    />
  );
};

export default App;
