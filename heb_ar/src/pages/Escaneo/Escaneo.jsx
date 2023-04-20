import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";

function Escaneo() {
  return (
    <>
      <AppBar />
      <div className="container">
        <h1>Escaneo</h1>
      </div>
      <NavBar pagina={'escaneo'}/>
    </>
  );
}

export default Escaneo;
