import React, { Fragment, useState, useCallback, useEffect } from "react";
import RedBarSVG from "../../assets/imgs/redBar.svg";
import HEBlogo from "../../assets/imgs/logo.svg";
import "./AppBar.css";
import { useAuth } from "../../context/AuthContext";
import UserSVG from "../../assets/icons/user.svg";
import MenuSVG from "../../assets/icons/menu.svg";
import Sidebar from "../Sidebar";
import OverviewPerfil2 from "../OverviewPerfil2";
import { Link } from "react-router-dom";

const AppBar = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOverviewOpen, setIsOverViewOpen] = useState(false);
  const [isClosingOverview, setIsClosingOverview] = useState(false);

  const handleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const handleOverview = useCallback(() => {
    setIsOverViewOpen(!isOverviewOpen);
  }, [isOverviewOpen]);
  
  const handleCloseOverview = useCallback(() => {
    setIsClosingOverview(true);
  }, []);

  useEffect(() => {
    if (isClosingOverview) {
      setTimeout(() => {
        setIsOverViewOpen(false);
        setIsClosingOverview(false);
      }, 500);
    }
  }, [isClosingOverview]);

  /*useEffect(() => {
    console.log("overview", isOverviewOpen);
  }, [isOverviewOpen]);*/

  return (
    <Fragment>
      <div className="app-bar">
        <img className="red-bar-svg" src={RedBarSVG} alt="reb-bar" />
        <Link to="/"><img className="logo" src={HEBlogo} alt="heb-logo" /></Link>
        {currentUser && (
          <>
            <img
              className="user-icon"
              src={UserSVG}
              alt="user-icon"
              onClick={handleOverview} />
            <img
              className="menu-icon"
              src={MenuSVG}
              alt="menu-icon"
              onClick={handleSidebar}
            />
            {isSidebarOpen && <Sidebar setOpen={handleSidebar} />}
            {isOverviewOpen && <OverviewPerfil2 setOpen={handleCloseOverview} />}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default AppBar;
