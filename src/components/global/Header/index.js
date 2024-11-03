import { useContext } from "react";
import { AuthContext } from "../../../Context/authContext";


import { Button, Flex } from "antd";
import AuthProfileDropDown from "../../shared/AuthProfile";
import "./index.css";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/constants/constants";

import {useSelector} from "react-redux";

// import logo from "../../../core/images/mylogo.png"
import logo from "../../../core/images/logoChristmas.png"

const Header = () => {

const {isAuth, userProfileInfo} = useContext(AuthContext)


const {count} = useSelector((store)=>store.userProfile)


  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
<Link to={isAuth ? ROUTE_CONSTANTS.CABINET : ROUTE_CONSTANTS.INTRO}>
    {count}
<img className="Header_logo" src={logo} alt="logo" />
</Link>
        <div>
       
          {
            isAuth ? <AuthProfileDropDown  userProfileInfo={userProfileInfo}/> : 
            <Link to={ROUTE_CONSTANTS.LOGIN}>
            <Button>Sign in</Button>
            </Link>
          }
        
        </div>
      </Flex>
    </div>
  );
};

export default Header;
