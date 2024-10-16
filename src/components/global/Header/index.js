import { Flex, Button } from "antd";
import AuthProfileDropDown from "../../shared/AuthProfile";
import "./index.css";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/constants/constants";

const Header = () => {
  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>

        <div>
       
          <AuthProfileDropDown />
        
        </div>
      </Flex>
    </div>
  );
};

export default Header;
