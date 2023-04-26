import React from "react";
// import AppBar from "../../common/AppBar/AppBar";
import Arrow from "../../assets/icons/arrow.svg"
import { Back, Titulo } from "./HistorialStyled"


function Historial() {
  return (
    <>
        {/* <AppBar/> */}
        <div className="container">
          <a href="/">
            <Back src={Arrow} alt="Regresar"/>
          </a>
          <Titulo>Historial</Titulo>

        </div>
    </>
  );
}

export default Historial;
