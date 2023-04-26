import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { Titulo } from "./CarritoStyled"

function Carrito() {
  return (
    <>
      <AppBar />
      <div className="container">
        <Titulo>Tu Carrito</Titulo>
      </div>
      <NavBar pagina={'carrito'}/>
    </>
  );
}

export default Carrito;
