import React from "react";
// import "./CrearCuenta.css";
import AppBar from "../../common/AppBar/AppBar";
// import styled from "styled-components";
import Calendar from "../../assets/icons/calendar.svg";
import {Titulo, Input, InputDiv, Fecha} from "./CrearCuentaStyled"
import NavBarAccess from "../../common/NavBar/NavBarAccess";

function CrearCuenta() {
  return (
    <>
      <AppBar />
      <div className="container">
        <div className="column">
          <Titulo>Crea tu Cuenta</Titulo>
          <Input placeholder="Nombre"/>
          <Input placeholder="Apellidos"/>
          <InputDiv className={"inputWithIcon"}>
            {/* <InputDate placeholder="Fecha de Nacimiento"/> */}
            <Fecha type="date" id="start" name="trip-start" min="1923-01-01" max="2023-12-31"></Fecha>
            {/* <img className="right-icon" src={Calendar} alt="heb-logo" /> */}
          </InputDiv>
          {/* <Input placeholder="Fecha de Nacimiento"/> */}

        </div>
      </div>
      <NavBarAccess />
    </>
  );
}

export default CrearCuenta;
