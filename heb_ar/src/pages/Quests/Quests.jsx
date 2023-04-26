import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import { Titulo } from "./QuestsStyled"

function Quests() {
  return (
    <>
      <AppBar />
      <div className="container">
        <Titulo>Tus Quests</Titulo>
      </div>
      <NavBar pagina={'quests'}/>
    </>
  );
}

export default Quests;
