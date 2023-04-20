import React from "react";
// import "./CrearCuenta.css";
import AppBar from "../../common/AppBar/AppBar";
// import styled from "styled-components";
import Calendar from "../../assets/icons/calendar.svg";
import {Title, Input, InputDiv, Date} from "./CrearCuentaStyled"

function CrearCuenta() {
  return (
    <>
      <AppBar />
      <div className="container">
        <div className="column">
          <Title>Crea tu Cuenta</Title>
          <Input placeholder="Nombre"/>
          <Input placeholder="Apellidos"/>
          <InputDiv className={"inputWithIcon"}>
            {/* <InputDate placeholder="Fecha de Nacimiento"/> */}
            <Date type="date" id="start" name="trip-start" value="2018-07-22" min="1923-01-01" max="2023-12-31"></Date>
            {/* <img className="right-icon" src={Calendar} alt="heb-logo" /> */}
          </InputDiv>
          {/* <Input placeholder="Fecha de Nacimiento"/> */}

        </div>
      </div>
    </>
  );
}

export default CrearCuenta;
