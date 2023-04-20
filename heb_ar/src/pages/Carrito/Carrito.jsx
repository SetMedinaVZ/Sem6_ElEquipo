import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";

function Carrito() {
  return (
    <>
      <AppBar />
      <div className="container">
        <h1>Carrito</h1>
      </div>
      <NavBar pagina={'carrito'}/>
    </>
  );
}

export default Carrito;
