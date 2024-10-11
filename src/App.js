
import MainLayout from "./components/Layout/Main";
// import Login from "./pages/auth/login";
// import Register from "./pages/auth/register";

import {Login, Register} from "./pages/auth"

import 'antd/dist/reset.css'; 

import "./styles/global.css";


import { ROUTE_CONSTANTS } from "./core/constants/constants";


import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Intro from "./components/Intro";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
             <Route path={ROUTE_CONSTANTS.INTRO} element={<Intro />} />
            <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
            <Route path={ROUTE_CONSTANTS.REGISTER} element={<Register />} />
          </Route>
        )
      )}
    />
  );
};

export default App;
