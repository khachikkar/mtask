import Header from "./components/global/Header";
import MainLayout from "./components/Layout/Main";
import Login from "./pages/login";
import Register from "./pages/register";

import 'antd/dist/reset.css'; 

import "./styles/global.css";

import { Flex } from "antd";

import { ROUTE_CONSTANTS } from "./core/constants/constants";


import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <Route path="/" element={<MainLayout />}>
            <Route path={ROUTE_CONSTANTS.LOGIN} element={<Login />} />
            <Route path={ROUTE_CONSTANTS.REGISTER} element={<Register />} />
          </Route>
        )
      )}
    />
  );
};

export default App;
