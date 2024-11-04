import MainLayout from "./components/Layout/Main";
import LoadingWraper from "./components/shared/LoadingWraper";
import CabinetLayout from "./components/Layout/Cabinet";

import { Login, Register } from "./pages/auth";

import "antd/dist/reset.css";

import { ROUTE_CONSTANTS } from "./core/constants/constants";

import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import Intro from "./components/Intro";

import Profile from "./pages/profile";

import {useEffect} from "react";

import { useDispatch, useSelector} from "react-redux";
import {fetchUserProfileInfo} from "./state-management/slices/userProfile";


import "./styles/global.css";


const App = () => {

const dispatch = useDispatch()
const {loading, authUserInfo:{isAuth}} =  useSelector(store=>store.userProfile)


useEffect(()=>{

dispatch(fetchUserProfileInfo()) //////////////////////
},[dispatch])

console.log("hello")


  return (
    <LoadingWraper loading={loading}> 
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
            <Route path={ROUTE_CONSTANTS.INTRO} element={<Intro />} />
            <Route path={ROUTE_CONSTANTS.LOGIN} element={ isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Login  />} />
            <Route path={ROUTE_CONSTANTS.REGISTER} element={ isAuth ?  <Navigate to={ROUTE_CONSTANTS.CABINET}/> : <Register />} />

{/* Cabinet Layout */}
          <Route path={ROUTE_CONSTANTS.CABINET}
           element={isAuth ? <CabinetLayout /> :  <Navigate to={ROUTE_CONSTANTS.LOGIN} />}
           >

            <Route path={ROUTE_CONSTANTS.PROFILE} element={ <Profile /> } />

          </Route>
          </Route>
        )
      )}
    />
    </LoadingWraper>  


  );
};

export default App;
