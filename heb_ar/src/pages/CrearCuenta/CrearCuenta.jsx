import React from "react";
import "./CrearCuenta.css";
import AppBar from "../../common/AppBar/AppBar";
import styled from "styled-components";
import Calendar from "../../assets/icons/calendar.svg";

const Input = styled.input`
  box-sizing: border-box;

  width: 290px;
  height: 40px;

  border: 1px solid #D5D5D5;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.20));
  border-radius: 10px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  padding-left: 18px;
  margin-bottom: 16px;
`;

const InputDate = styled.input` 
  width: 100%;
  
  height: 40px;

  border: 1px solid #D5D5D5;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.20));
  border-radius: 10px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  padding-left: 18px;
  margin-bottom: 16px;
`;

const InputDiv = styled.div`
    display: flex;
    width: 290px;
    height: 40px;

    &.inputWithIcon {
        position: relative;
    }

    .right-icon {
        position: absolute;
        right: 10px;
        top: 50%;
    transform: translateY(-50%);
    svg {
      fill: black;
      transition: 0.3s;
    }
  }
`;

const Button = styled.button`
  width: 290px;
  height: 38px;
  margin-bottom: 12px;
  display:flex; 
  justify-content: center;
`;

function CrearCuenta() {
  return (
    <>
      <AppBar />
      <div className="container">
        <div className="column">
          <h1 className="Title">Crea tu Cuenta</h1>
          <Input placeholder="Nombre"/>
          <Input placeholder="Apellidos"/>
          <InputDiv className={"inputWithIcon"}>
            <InputDate placeholder="Fecha de Nacimiento"/>
            <img className="right-icon" src={Calendar} alt="heb-logo" />
          </InputDiv>
          {/* <Input placeholder="Fecha de Nacimiento"/> */}

        </div>
      </div>
    </>
  );
}

export default CrearCuenta;
