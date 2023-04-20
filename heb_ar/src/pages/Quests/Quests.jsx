import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";

function Quests() {
  return (
    <>
      <AppBar />
      <div className="container">
        <h1>Quests</h1>
      </div>
      <NavBar pagina={'quests'}/>
    </>
  );
}

export default Quests;
