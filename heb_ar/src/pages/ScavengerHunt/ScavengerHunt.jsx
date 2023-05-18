import React from "react";
// import AppBar from "../../common/AppBar/AppBar";
// import NavBar from "../../common/NavBar/NavBar";
import Arrow from "../../assets/icons/arrow.svg"
import {Titulo, Back} from "./ScavengerHuntStyled"
import { Link, useNavigate} from "react-router-dom";

function GastosMensuales() {

    const navigate = useNavigate();
  
    return (
    <>
        {/* <AppBar /> */}
        <div className="container">
          {/* <Link to="/"> */}
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          <Titulo>Scavenger Hunt</Titulo>
          {/* </Link> */}
        </div>
    </>
    );
}
    
export default GastosMensuales;  