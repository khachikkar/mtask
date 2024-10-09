import { Flex, Button } from "antd";
import "./index.css";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../../core/constants/constants";

const Header = () => {
  return (
    <div className="main_header">
      <Flex justify="space-between" align="center">
        <p>Logo</p>

        <div>
          <Link to={ROUTE_CONSTANTS.LOGIN}>
          <Button>Sign in</Button>
          </Link>
        </div>
      </Flex>
    </div>
  );
};

export default Header;
