import { Route, Routes } from "react-router-dom";
import { ROUTE_CONSTANTS } from "./route-constant";
import Home from "../pages/Home/Home";

const AppSwitch = () => {
  return (
    <Routes>
      <Route path={ROUTE_CONSTANTS.HOME} element={<Home />} />
    </Routes>
  );
};

export default AppSwitch;
