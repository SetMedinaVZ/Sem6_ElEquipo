import React, { Fragment, useState, useCallback } from "react";
import RedBarSVG from "../../assets/imgs/redBar.svg";
import HEBlogo from "../../assets/imgs/logo.svg";
import "./AppBar.css";
import { useAuth } from "../../context/AuthContext";
import UserSVG from "../../assets/icons/user.svg";
import MenuSVG from "../../assets/icons/menu.svg";
import Sidebar from "../Sidebar";

const AppBar = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <Fragment>
      <div className="app-bar">
        <img className="red-bar-svg" src={RedBarSVG} alt="reb-bar" />
        <img className="logo" src={HEBlogo} alt="heb-logo" />
        {currentUser && (
          <>
            <img className="user-icon" src={UserSVG} alt="user-icon" />
            <img
              className="menu-icon"
              src={MenuSVG}
              alt="menu-icon"
              onClick={handleSidebar}
            />
            {isSidebarOpen && <Sidebar setOpen={handleSidebar} />}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default AppBar;
