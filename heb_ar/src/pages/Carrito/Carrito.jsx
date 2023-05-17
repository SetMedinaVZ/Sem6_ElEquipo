import React, {useState} from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CarritoCard from "../../components/carrito/carritoCard/carritoCard";
import { CarritoList, Next, Price, Titulo, Space } from "./CarritoStyled"
import { useQuery } from "@apollo/client";
import { GET_CARRITO } from "../../graphql/queries/getCarrito";

function Carrito() {
  var newPriceTotal = 0
  const { loading, error, data } = useQuery(GET_CARRITO);
  let carritoList = [];
  if (data !== undefined) {
    data.carrito.forEach(product => {
      carritoList.push(<CarritoCard name={product.name} size={product.size} priceU={product.precioU} amountI={product.cantidad} uid={product.uid}></CarritoCard>);
      newPriceTotal = newPriceTotal + (product.precioU * product.cantidad);
    });
  }



  return (
    <>
      <AppBar />
      {loading && <p>Loading...</p>}
      {error && <>Error! ${error.message}</>}
      {data && (
        <div className="container">
          <Titulo>Tu Carrito</Titulo>
          <CarritoList>
            {carritoList}
          </CarritoList>
          <Space/>
          <Price>
            <p>Total: </p>
            <p>${newPriceTotal}</p>
          </Price>
          <Next>Continuar al checkout</Next>
        </div>
      )}
      <NavBar pagina={'carrito'}/>
    </>
  );
}

export default Carrito;
