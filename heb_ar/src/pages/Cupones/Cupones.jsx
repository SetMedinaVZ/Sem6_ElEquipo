import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { Titulo } from "./CuponesStyled"

function Cupones() {
  return (
    <>
      <AppBar />
      <div className="container">
        <Titulo>Cupones por tiempo</Titulo>
      </div>
      <NavBar pagina={'cupones'}/>
    </>
  );
}

export default Cupones;
