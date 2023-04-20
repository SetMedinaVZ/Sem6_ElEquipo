import React from "react";
import RedBarSVG from "../../assets/imgs/redBar.svg";
import "./NavBarAccess.css";

const NavBarAccess = () => {
  return (
    <>
      <div className="app-bar-a">
        <img className="red-bar-svg-a" src={RedBarSVG} alt="reb-bar" />
      </div>
    </>
  );
};

export default NavBarAccess;
