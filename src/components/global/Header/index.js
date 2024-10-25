import { useContext } from "react";
import { AuthContext } from "../../../Context/authContext";


import { Button, Flex } from "antd";
import AuthProfileDropDown from "../../shared/AuthProfile";
import "./index.css";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/constants/constants";

// import logo from "../../../core/images/mylogo.png"
import logohalloween from "../../../core/images/logoHallowenn.png"

const Header = () => {

const {isAuth, userProfileInfo} = useContext(AuthContext)

  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
<Link to={isAuth ? ROUTE_CONSTANTS.CABINET : ROUTE_CONSTANTS.INTRO}>
<img className="Header_logo" src={logohalloween} alt="logo" />
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
