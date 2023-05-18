import React from "react";
// import AppBar from "../../common/AppBar/AppBar";
// import NavBar from "../../common/NavBar/NavBar";
import Arrow from "../../assets/icons/arrow.svg"
import {Titulo, Back, Progress, ProgressTxt, Txt} from "./ScavengerHuntStyled"
import { Link, useNavigate} from "react-router-dom";

function GastosMensuales() {

    const navigate = useNavigate();
  
    return (
    <>
        {/* <AppBar /> */}
        <div className="container">
          {/* <Link to="/"> */}
          <div onClick={() => navigate(-1)}>
            <Back src={Arrow} alt="Regresar"/>
          </div>
          <Titulo>Scavenger Hunt</Titulo>
          <Progress>
            <ProgressTxt>1/5 completados</ProgressTxt>
          </Progress>
          <Txt>En una zona de la sucursal se encuentran 5 objetos escondidos, es tu misión encontrarlos utilizando la camara de tu celular con realidad aumentada.</Txt>
          {/* </Link> */}
        </div>
    </>
    );
}
    
export default GastosMensuales;  