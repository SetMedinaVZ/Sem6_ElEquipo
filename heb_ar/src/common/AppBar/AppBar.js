import React from "react";
import RedBarSVG from "../../assets/imgs/redBar.svg";
import HEBlogo from "../../assets/imgs/logo.svg";
import "./AppBar.css";

const AppBar = () => {
  return (
    <>
      <div className="app-bar">
        <img className="red-bar-svg" src={RedBarSVG} alt="reb-bar" />
        <img className="logo" src={HEBlogo} alt="heb-logo" />
      </div>
    </>
  );
};

export default AppBar;
