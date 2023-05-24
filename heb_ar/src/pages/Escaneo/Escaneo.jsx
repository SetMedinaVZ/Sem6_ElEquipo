import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
// import Barcode

import "./Escaneo.css";

function Escaneo() {

  return (
    <>
      <AppBar />
      <div className="container">
        <div className="camara">
        </div>
      </div>
      <NavBar pagina={'escaneo'}/>
    </>
  );
}

export default Escaneo;
