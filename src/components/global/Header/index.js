


import { Button, Flex } from "antd";
import AuthProfileDropDown from "../../shared/AuthProfile";
import "./index.css";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/constants/constants";

import {useSelector} from "react-redux";

// import logo from "../../../core/images/mylogo.png"
import logo from "../../../core/images/logoChristmas.avif"

const Header = () => {




const {authUserInfo: {isAuth, userData}}= useSelector((store)=>store.userProfile) /////////
// console.log(authUserInfo, "auth")



  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
<Link to={ ROUTE_CONSTANTS.INTRO}>
<img className="Header_logo" src={logo} alt="logo" />
</Link>
        <div>

          {
            isAuth ? <AuthProfileDropDown  userProfileInfo={userData}/> :
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
