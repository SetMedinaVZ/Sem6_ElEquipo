import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CarritoCard from "../../components/carrito/carritoCard/carritoCard";
import { Titulo } from "./CarritoStyled"

function Carrito() {
  return (
    <>
      <AppBar />
      <div className="container">
        <Titulo>Tu Carrito</Titulo>
        <CarritoCard name={'Leche'} size={'1L'} priceU={20.5} amount={5}></CarritoCard>
      </div>
      <NavBar pagina={'carrito'}/>
    </>
  );
}

export default Carrito;
