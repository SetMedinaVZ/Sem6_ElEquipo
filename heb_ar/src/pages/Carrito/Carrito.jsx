import React from "react";
import AppBar from "../../common/AppBar/AppBar";
import NavBar from "../../common/NavBar/NavBar";
import CarritoCard from "../../components/carrito/carritoCard/carritoCard";
import { Titulo } from "./CarritoStyled"
import { useQuery } from "@apollo/client";
import { GET_CARRITO } from "../../graphql/queries/getCarrito";

function Carrito() {
  const { loading, error, data } = useQuery(GET_CARRITO);

  let carritoList = [];
  console.log(data.carrito)
  data.carrito.forEach(product => {
    carritoList.push(<CarritoCard name={product.name} size={product.size} priceU={product.precioU} amountI={product.cantidad}></CarritoCard>);
  });

  return (
    <>
      <AppBar />
      {loading && <p>Loading...</p>}
      {error && <>Error! ${error.message}</>}
      {data && (
        <div className="container">
          <Titulo>Tu Carrito</Titulo>
          {carritoList}
        </div>
      )}
      <NavBar pagina={'carrito'}/>
    </>
  );
}

export default Carrito;
