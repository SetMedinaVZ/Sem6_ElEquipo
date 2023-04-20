import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";

function Cupones() {
  return (
    <>
      <AppBar />
      <div className="container">
        <h1>Cupones</h1>
      </div>
      <NavBar pagina={'cupones'}/>
    </>
  );
}

export default Cupones;
