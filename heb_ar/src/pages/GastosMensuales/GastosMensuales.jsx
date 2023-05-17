import React from "react";
// import AppBar from "../../common/AppBar/AppBar";
// import NavBar from "../../common/NavBar/NavBar";
import Arrow from "../../assets/icons/arrow.svg"
import {Titulo, Back} from "./GastosMensualesStyled"

function GastosMensuales() {
    return (
      <>
        {/* <AppBar /> */}
        <div className="container">
          <a href="/">
            <Back src={Arrow} alt="Regresar"/>
          </a>
          <Titulo>Gastos Mensuales</Titulo>
          
          
        </div>
      </>
    );
  }
  
  export default GastosMensuales;
  